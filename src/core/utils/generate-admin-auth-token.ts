import {ADMIN_USERNAME, ADMIN_PASSWORD} from '../../auth/middlewares/super-admin.guard-middleware';

export const generateAdminAuthToken = () => {
    const credentials = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
    const token = Buffer.from(credentials).toString('base64');
    return `Basic ${token}`;
}