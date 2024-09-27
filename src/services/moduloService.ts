import { ssoDB } from '../database/connection';
import { queries } from '../database/modulosQueries';

export const getAllModulos = async () => {
    try {
        const db = await ssoDB();
        const [modulos]=await db.execute(queries.getAllModulos);
        console.log(modulos);
        return modulos;
    } catch (error) {

    }
}