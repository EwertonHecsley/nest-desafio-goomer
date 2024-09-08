export default class Price {
    private constructor(readonly value: number) {
        this.value = value;
    }

    static create(value: number): Price {
        return new Price(value);
    }

    formattedPriceBRL() {
        return new Intl.NumberFormat(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        ).format(this.value)
    }
}