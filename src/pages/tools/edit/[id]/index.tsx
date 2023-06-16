import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getToolById, updateToolById } from 'apiSdk/tools';
import { Error } from 'components/error';
import { toolValidationSchema } from 'validationSchema/tools';
import { ToolInterface } from 'interfaces/tool';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OutletInterface } from 'interfaces/outlet';
import { getOutlets } from 'apiSdk/outlets';

function ToolEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ToolInterface>(
    () => (id ? `/tools/${id}` : null),
    () => getToolById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ToolInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateToolById(id, values);
      mutate(updated);
      resetForm();
      router.push('/tools');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ToolInterface>({
    initialValues: data,
    validationSchema: toolValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Tool
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl
              id="availability_status"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.availability_status}
            >
              <FormLabel htmlFor="switch-availability_status">Availability Status</FormLabel>
              <Switch
                id="switch-availability_status"
                name="availability_status"
                onChange={formik.handleChange}
                value={formik.values?.availability_status ? 1 : 0}
              />
              {formik.errors?.availability_status && (
                <FormErrorMessage>{formik.errors?.availability_status}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<OutletInterface>
              formik={formik}
              name={'outlet_id'}
              label={'Select Outlet'}
              placeholder={'Select Outlet'}
              fetcher={getOutlets}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'tool',
  operation: AccessOperationEnum.UPDATE,
})(ToolEditPage);
