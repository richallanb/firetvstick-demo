import { fetchShowData } from "./actions";
import { INITIALIZE_SHOWS } from "./actionTypes";
import createMiddleware from "../redux-utils/createMiddleware";

function initialFetch() {
    return fetchShowData();
}

export default createMiddleware({
    INITIALIZE_SHOWS: initialFetch
});