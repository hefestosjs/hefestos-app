import { Model, PaginateInterface } from "../interfaces/responseUtils";

export default {
  paginate: function ({ data, page, perPage, totalData }: PaginateInterface) {
    const response = {
      data,
      meta: {
        currentPage: Number(page),
        lastPage: Math.ceil(totalData / perPage),
        perPage: perPage,
        totalPages: Math.ceil(totalData / perPage),
        totalItems: totalData,
      },
    };

    return response;
  },

  exclude: function <ModelType extends Model, Key extends keyof ModelType>(
    model: ModelType,
    keys: Key[]
  ): Omit<ModelType, Key> {
    return Object.fromEntries(
      Object.entries(model).filter(([key]) => !keys.includes(key as Key))
    ) as Omit<ModelType, Key>;
  },

  excludeFromList: function <
    ModelType extends Model,
    Key extends keyof ModelType
  >(list: ModelType[], keys: Key[]): Omit<ModelType, Key>[] {
    return list.map((obj) => this.exclude(obj, keys));
  },
};
