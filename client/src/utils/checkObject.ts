// function to check whether an object has non-empty string values or not

export function checkObject(object: Record<string, unknown>) {
    for (let key in object) {
        if (object[key] !== "") {
            return false;
        }
    }
    return true;
}