import {Validators, createFormValidation } from "@lemoncode/fonk";
import { isNumber } from '@lemoncode/fonk-is-number-validator'

const validationSchema = {
    field: {
        selectedAccountId: [Validators.required],
        iban: [Validators.required, isNumber.validator],
        name: [Validators.required],
        amount: [Validators.required, isNumber.validator],
        concept: [Validators.required],
        notes: [Validators.required],
        day: [Validators.required, isNumber.validator],
        month: [Validators.required, isNumber.validator],
        year: [Validators.required, isNumber.validator],
        email: [Validators.required, Validators.email],
    },
};

export const formValidation = createFormValidation(validationSchema);