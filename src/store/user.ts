import {defineStore} from 'pinia'
import {userApi, authApi} from "../app/api";
import useAppStore from './app.ts'
import {
    IChangePassword, IChangeUserPassword,
    ICheckUserResponse,
    ICreateUser,
    IFirstCheckUserByEmail,
    ILoginUser, IUser,
} from "../app/api/types.ts";
import {reactive} from "vue";

export default defineStore('user', () => {
    const user = reactive({
        id: '',
        isAdmin: false,
        email: '',
        firstName: '',
        lastName: '',
        isStaff: false,
        isConfirmed: false,
        isActive: false,
        isCompanyAdmin: false,
        inConsideration: false,
        company: '',
        avatar: null,
    })
    const appStore = useAppStore();
    const checkUser = async () => userApi.checkUserFetch(appStore.appConfig.accessToken)
        .then(data => {
            if (data.status === 200) {
                const {
                    avatar,
                    company,
                    email,
                    first_name,
                    id,
                    in_consideration,
                    is_active,
                    is_company_admin,
                    is_confirmed,
                    is_staff,
                    last_name,
                } = data.data as ICheckUserResponse;
                user.avatar = avatar;
                user.company = company;
                user.email = email;
                user.firstName = first_name;
                user.lastName = last_name;
                user.email = email;
                user.id = id;
                user.inConsideration = in_consideration;
                user.isActive = is_active;
                user.isCompanyAdmin = is_company_admin;
                user.isConfirmed = is_confirmed;
                user.isStaff = is_staff;
                appStore.appConfig.isAuth = true;
            }
        })

    const loginUser = (dto: ILoginUser) => authApi.loginUserFetch(dto)
    const checkExistUserByEmail = async (dto: IFirstCheckUserByEmail) => {
        return authApi.checkExistUserByEmailFetch(dto).then((data) => {
                if (data.status === 200) {
                    user.id = data.data.id_user;
                }
                return data
            })
    }
    const createUser = async (dto: ICreateUser) => {
        return authApi.createUserFetch(dto).then((data) => {
                if (data.status === 200) {
                    user.id = data.data.id_user;
                }
                return data
            })
    }
    const resetPasswordByEmail = async (email: string)=> authApi.resetPasswordByEmailFetch(email)
    const sendVerifyCodeToResetPassword = (code: string) => authApi.sendVerifyCodeToResetPasswordFetch(code)
    const changeUserPassword = async (dto: IChangePassword) => {
        return authApi.changePasswordFetch(dto).then((data) => {
            if (data.status === 200) {
                appStore.appConfig.isAuth = true
            }
            return data
        })
    }
    const changeProfilePassword = async (dto: IChangeUserPassword)=> userApi.changeProfilePasswordFetch(dto, appStore.appConfig.accessToken)

    const updateUser = async (dto: Partial<IUser>) => userApi.checkUserFetch(dto, appStore.appConfig.accessToken)

    return {
        user,
        checkUser,
        loginUser,
        updateUser,
        createUser,
        changeUserPassword,
        checkExistUserByEmail,
        changeProfilePassword,
        sendVerifyCodeToResetPassword,
        resetPasswordByEmail,
    }
})