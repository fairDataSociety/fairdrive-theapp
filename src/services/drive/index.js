import reducer from "./reducer";
import saga from "./sagas";

// Service > system

export const mountPoint = "drive";

export default {
    mountPoint,
    reducer,
    saga
};
