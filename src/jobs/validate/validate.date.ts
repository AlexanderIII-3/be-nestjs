import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEndDateAfterStartDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isEndDateAfterStartDate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(endDate: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    return obj.startDate && endDate && endDate > obj.startDate;
                },
                defaultMessage(args: ValidationArguments) {
                    return 'End date must be after start date';
                },
            },
        });
    };
}