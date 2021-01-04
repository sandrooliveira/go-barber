import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiLock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Appointment,
  Section,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Schedule</h1>
          <p>
            <span>Today</span>
            <span>07th</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>

            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/6620074?s=460&u=61deb6f4a33ab426672143bb6b67b69ad22a58a1&v=4"
                alt="Sandro Oliveira"
              />

              <strong>Sandro Oliveira</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/6620074?s=460&u=61deb6f4a33ab426672143bb6b67b69ad22a58a1&v=4"
                  alt="Sandro Oliveira"
                />

                <strong>Sandro Oliveira</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiLock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/6620074?s=460&u=61deb6f4a33ab426672143bb6b67b69ad22a58a1&v=4"
                  alt="Sandro Oliveira"
                />

                <strong>Sandro Oliveira</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/6620074?s=460&u=61deb6f4a33ab426672143bb6b67b69ad22a58a1&v=4"
                  alt="Sandro Oliveira"
                />

                <strong>Sandro Oliveira</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
            fromMonth={new Date()}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
