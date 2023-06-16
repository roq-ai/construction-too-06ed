const mapping: Record<string, string> = {
  companies: 'company',
  customers: 'customer',
  outlets: 'outlet',
  promotions: 'promotion',
  reservations: 'reservation',
  tools: 'tool',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
