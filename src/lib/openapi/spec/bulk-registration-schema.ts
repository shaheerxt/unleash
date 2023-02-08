import { FromSchema } from 'json-schema-to-ts';

export const bulkRegistrationSchema = {
    $id: '#/components/schemas/bulkRegistrationSchema',
    type: 'object',
    required: ['name'],
    properties: {
        connectVia: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        appName: {
            type: 'string',
        },
        environment: {
            type: 'string',
        },
        instanceId: {
            type: 'string',
        },
        interval: {
            type: 'number',
        },
        started: {
            type: 'number',
        },
        strategies: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        sdkVersion: {
            type: 'string',
        },
    },
    schemas: {},
} as const;

export type BulkRegistrationSchema = FromSchema<typeof bulkRegistrationSchema>;
