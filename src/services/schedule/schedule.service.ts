import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";
import { createPropertySerializer as createScheduleSerializer } from "../../serializers/property.serializer";
import { Properties } from "../../entities/properties.entity";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { IScheduleRequest } from "../../interfaces/schedules";
import { scheduleSerializer } from "../../serializers/schedules.serializer";
import { SchedulesUsers } from "../../entities/schedulesUsersProperties.entity";
import { User } from "../../entities/user.entity";

export const createScheduleService = async (
  dataClientSchedule: IScheduleRequest,
  id: string
) => {
  const serializedSchedule = await scheduleSerializer.validate(
    dataClientSchedule,
    {
      stripUnknown: true,
      abortEarly: true,
    }
  );

  const propertyRepository = AppDataSource.getRepository(Properties);
  const scheduleRepository = AppDataSource.getRepository(SchedulesUsers);
  const userRepository = AppDataSource.getRepository(User);

  const property = await propertyRepository.findOneBy({
    id: serializedSchedule.propertyId,
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  const user = await userRepository.findOneBy({
    id,
  });

  const newDate = new Date(serializedSchedule.date).getDay();

  if (
    newDate === 0 ||
    newDate === 6 ||
    serializedSchedule.hour < "08:00" ||
    serializedSchedule.hour > "18:00"
  ) {
    throw new AppError(400, "Date or hour invalid");
  }

  const scheduleExists = await scheduleRepository.findOneBy({
    date: serializedSchedule.date,
    hour: serializedSchedule.hour,
    property: {
      id: serializedSchedule.propertyId,
    },
  });

  if (scheduleExists) {
    throw new AppError(400, "Schedule already exists");
  }

  await scheduleRepository.save({
    ...serializedSchedule,
    user: user!,
    property,
  });

  return true;
};

export const readSheduleService = async (id: string) => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const property = await propertyRepository.findOne({
    where: {
      id,
    },
    relations: {
      schedules: {
        user: true,
      },
    },
  });

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  return property;
};
