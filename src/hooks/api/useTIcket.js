import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export function useTicket() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketsLoading,
    error: ticketsError,
    act: useTickets,
  } = useAsync(() => ticketApi.getTicketType(token));
  return {
    tickets,
    ticketsLoading,
    ticketsError,
    useTickets,
  };
}
export function postTicket() {
  const token = useToken();
  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket,
  } = useAsync((data) => ticketApi.createTicket(data, token), false);

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket,
  };
}
