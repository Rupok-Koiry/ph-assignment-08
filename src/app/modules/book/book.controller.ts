import * as factory from "../../utils/handlerFactory";

export const getBook = factory.getOne("book");
export const getAllBooks = factory.getAll("book");
export const updateBook = factory.updateOne("book");
export const createBook = factory.createOne("book");
export const deleteBook = factory.deleteOne("book");
