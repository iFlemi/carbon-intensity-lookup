import {Either} from "prelude-ts";

export type HttpClient = ReturnType <typeof newHttpClient>

export const newHttpClient =  (apiKey: string) =>  {
    const get = async <T>(url: string, headers: Headers = new Headers()): Promise<Either<Error, T>> => {
        headers.append('auth-token', apiKey)
        const response = await fetch(url, {headers})
        if (response.ok)
            return Either.right(await response.json())
        return Either.left(new Error(await response.json()))
    }
    return {get}
}
