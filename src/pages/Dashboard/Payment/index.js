import styled from 'styled-components';
import { useEffect } from 'react';
import { useSubscription } from '../../../contexts/SubscriptionContext';
import { Typography } from '@material-ui/core';
import { useTicket } from '../../../hooks/api/useTIcket';

export default function Payment() {
  const { hasNewData } = useSubscription();
  const { tickets } = useTicket();
  useEffect(() => {
    if (hasNewData) {
      useTicket();
    }
  }, [hasNewData, useTicket]);

  console.log(tickets, 'tickets');
  const presencialTickets = tickets?.filter((ticket) => !ticket.isRemote) || [];
  const remotoTickets = tickets?.filter((ticket) => ticket.isRemote) || [];
  return (
    <PaymentContainer>
      <Tittle variant="h4"> Ingresso e Pagamento</Tittle>

      {hasNewData ? (
        <>
          <Description>Primeiro, escolha sua modalidade de ingresso</Description>
          {tickets && (
            <>
              {presencialTickets.length > 0 && (
                <BoxTicket>
                  <h2>Presencial</h2>
                  {presencialTickets.map((ticket) => (
                    <TicketInfo key={ticket.id}>
                      <p>Valor: {ticket.TicketType.price}</p>
                    </TicketInfo>
                  ))}
                </BoxTicket>
              )}
              {remotoTickets.length > 0 && (
                <BoxTicket>
                  <h2>Remoto</h2>
                  {remotoTickets.map((ticket) => (
                    <TicketInfo key={ticket.id}>
                      <p>Valor: {ticket.TicketType.price}</p>
                    </TicketInfo>
                  ))}
                </BoxTicket>
              )}
            </>
          )}
        </>
      ) : (
        <Message>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso.</p>
        </Message>
      )}
    </PaymentContainer>
  );
}

const PaymentContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const Tittle = styled(Typography)``;

const Description = styled.p`
  padding: 12px 0 12px 0;
  color: #8e8e8e;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const BoxTicket = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 145px;
  height: 145px;
  margin-top: 5px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #cecece;
  h2 {
    color: #454545;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  p {
    color: #898989;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Message = styled.div`
  width: 388px;
  height: 46px;
  margin: 27%;

  p {
    color: #8e8e8e;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const TicketInfo = styled.div``;
