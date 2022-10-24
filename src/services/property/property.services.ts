import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";
import { createPropertySerializer } from "../../serializers/property.serializer";
import { Properties } from "../../entities/properties.entity";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";

export const createPropertyService = async (
  dataClientProperty: IPropertyRequest
) => {
  const serializedProperty = await createPropertySerializer.validate(
    dataClientProperty,
    {
      stripUnknown: true,
      abortEarly: true,
    }
  );

  const propertyRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryExists = await categoryRepository.findOneBy({
    id: serializedProperty.categoryId,
  });

  if (!categoryExists) {
    throw new AppError(404, "Category not found");
  }

  if (
    serializedProperty.address.zipCode?.length > 8 ||
    serializedProperty.address.state?.length > 2
  ) {
    throw new AppError(400, "Zipcode or State invalid");
  }

  const addressExists = await addressRepository.findOneBy({
    district: serializedProperty.address.district,
    city: serializedProperty.address.city,
    number: serializedProperty.address.number,
    state: serializedProperty.address.state,
    zipCode: serializedProperty.address.zipCode,
  });

  if (addressExists) {
    throw new AppError(400, "Address already exists");
  }

  const newAddress: Addresses = await addressRepository.save({
    ...serializedProperty.address,
  });

  const property = propertyRepository.create({
    id: serializedProperty.id,
    size: serializedProperty.size,
    category: categoryExists,
    address: newAddress,
    value: serializedProperty.value,
    sold: serializedProperty.sold,
  });

  await propertyRepository.save(property);

  return property;
};

export const readPropertyService = async () => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const property = await propertyRepository.find();

  return property;
};
