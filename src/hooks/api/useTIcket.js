import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export async function useTicket() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketsLoading,
    error: ticketsError,
    act: useTickets
  } = useAsync(() => ticketApi.getTicketType(token));
  console.log(tickets, 'hook');
  return {
    tickets,
    ticketsLoading,
    ticketsError,
    useTickets
  };
}
