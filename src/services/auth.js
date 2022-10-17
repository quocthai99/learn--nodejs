import db from '../models'

export const registor = () => new Promise((resolve, reject) => {
    try {
        resolve({
            err: 0,
            mes: 'registor service'
        })
        console.log('after resolve');
        
    } catch (error) {
        reject(error)
    }
})