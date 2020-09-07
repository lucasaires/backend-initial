import ICreateAppoitmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppoitmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
