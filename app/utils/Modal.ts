import * as tf from '@tensorflow/tfjs'

class Model {
    private static instance: Model | null = null
    public model!: tf.LayersModel
    private Loaded: boolean

    constructor() {
        this.start()

        this.Loaded = false
    }

    async start() {
        await tf.setBackend('cpu');

        this.model = await tf.loadLayersModel('http://localhost:3000/model.json')

        this.Loaded = true
    }

    predict(data: number[][][]) {
        if (!this.Loaded) return { result: 'Model is not loaded' }

        const tensor = tf.tensor4d([data])

        const result = this.model.predict(tensor)

        return result.toString()
    }

    isLoaded() {
        return this.Loaded
    }

    static getInstance(): Model {
        if (!this.instance) {
            this.instance = new Model();
        }

        return this.instance;
    }
}

export default Model 