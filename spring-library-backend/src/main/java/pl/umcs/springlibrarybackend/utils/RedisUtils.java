package pl.umcs.springlibrarybackend.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class RedisUtils {
    public static <T> T safeCast(Object obj, Class<T> type) throws ClassCastException {
        if (type.isInstance(obj)) {
            return type.cast(obj);
        }

        throw new ClassCastException("Cannot cast object of type " + obj.getClass().getName() + " to " + type.getName());
    }
}
