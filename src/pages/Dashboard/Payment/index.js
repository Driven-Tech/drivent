import styled from 'styled-components';
import { useSubscription } from '../../../contexts/SubscriptionContext';
import { Typography } from '@material-ui/core';
import { useTicket } from '../../../hooks/api/useTIcket';
import { useState } from 'react';
import { postTicket } from '../../../hooks/api/useTIcket';
import Button from '../../../components/Form/Button';

export default function Payment() {
  const { hasNewData } = useSubscription();
  const { tickets } = useTicket();
  const { saveTicket } = postTicket();
  const [isSelected, setSelected] = useState(null);
  console.log(isSelected);
  console.log(tickets, 'tickets');
  const presencialTickets = tickets?.filter((ticket) => !ticket.isRemote) || [];
  const remotoTickets = tickets?.filter((ticket) => ticket.isRemote) || [];

  const handleReserveTicket = async() => {
    if (isSelected) {
      try {
        const data = { ticketTypeId: isSelected };
        await saveTicket(data);
        console.log('ingresso reservado');
      } catch (error) {
        console.log(error, 'erro ao reservar ingresso');
      }
    }
  };
  return (
    <PaymentContainer>
      <Tittle variant="h4"> Ingresso e Pagamento</Tittle>

      {hasNewData ? (
        <>
          <Description>Primeiro, escolha sua modalidade de ingresso</Description>
          {tickets && (
            <ContainerTicket>
              {presencialTickets.length > 0 && (
                <BoxTicket
                  isSelected={isSelected === presencialTickets[0]?.id}
                  onClick={() => setSelected(presencialTickets[0].id)}
                >
                  <h2>Presencial</h2>
                  {presencialTickets.map((ticket) => (
                    <TicketInfo key={ticket.id}>
                      <p>R$ {ticket.price}</p>
                    </TicketInfo>
                  ))}
                </BoxTicket>
              )}
              {remotoTickets.length > 0 && (
                <BoxTicket
                  isSelected={isSelected === remotoTickets[0]?.id}
                  onClick={() => setSelected(remotoTickets[0].id)}
                >
                  <h2>Remoto</h2>
                  {remotoTickets.map((ticket) => (
                    <TicketInfo key={ticket.id}>
                      <p>R$ {ticket.price}</p>
                    </TicketInfo>
                  ))}
                </BoxTicket>
              )}
            </ContainerTicket>
          )}
          {isSelected && remotoTickets.length > 0 && (
            <>
              <NotificationConfirmed>
                <p>
                  Fechado! O total ficou em{' '}
                  <PriceValue>R$ {remotoTickets.find((t) => t.id === isSelected)?.price}</PriceValue>. Agora é só
                  confirmar:
                </p>
              </NotificationConfirmed>  
              <Booking>
                <Button onClick={handleReserveTicket}>Reservar Ingresso</Button>
              </Booking>
            </>
          )}
        </>
      ) : (
        <>
          <Message>
            <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso.</p>
          </Message>
        </>
      )}
    </PaymentContainer>
  );
}

const ContainerTicket = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaymentContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const Tittle = styled(Typography)``;

const PriceValue = styled.span`
  color: #8e8e8e;
  font-size: 17.5px;
  font-weight: bold;
`;
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
  background-color: ${(props) => (props.isSelected ? '#FFEED2' : 'none')};
  &:last-child {
    margin-left: 23px;
  }
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

const Booking = styled.div`
  /*display: flex;
  align-items: center;
  justify-content: center;
  width: 162px;
  height: 37px;
  border-radius: 4px;
  margin-top: 38px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;*/
  margin-top: 40px!important;
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;

const NotificationConfirmed = styled.div`
  width: 500px;
  height: 24px;
  margin-top: 44px;
  p {
    color: #8e8e8e;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
