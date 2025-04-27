import {Either} from "prelude-ts";

export const partitionEithers = <A, E = Error>(self: Either<E, A>[]): [E[], A[]] => {
    const as: A[] = []
    const es: E[] = []

    for (let i = 0; i < self.length; i++) {
        if (self[i].isLeft()) {
            es.push(self[i].getLeftOrThrow())
        } else {
            as.push(self[i].getOrThrow())
        }
    }
    return [es, as]
}

export const getRoundedAverage = (input: number[]) =>
    Math.round(input.reduce((previous, current) => previous + current) / input.length)

