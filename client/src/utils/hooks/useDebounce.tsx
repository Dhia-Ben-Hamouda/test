import React, { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
    const [currentValue, setCurrentValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(currentValue);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(currentValue);
        }, delay);

        return () => { clearTimeout(timeout); }
    }, [currentValue])

    return [debouncedValue, setCurrentValue] as const;
}