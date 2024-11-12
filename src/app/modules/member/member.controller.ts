import * as factory from "../../utils/handlerFactory";

export const getMember = factory.getOne("member");
export const getAllMembers = factory.getAll("member");
export const updateMember = factory.updateOne("member");
export const createMember = factory.createOne("member");
export const deleteMember = factory.deleteOne("member");
