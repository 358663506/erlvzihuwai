<template>
    <div class="page-login">
        <div class="box">

            <el-form label-position="top" class="form" size="medium" :disabled="saving">
                <p class="desc">{{ app.name }}后台管理系统</p>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名" maxlength="20" auto-complete="off" />
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" maxlength="20" auto-complete="off" />
                </el-form-item>

                <el-form-item label="验证码" class="captcha">
                    <el-input v-model="form.verifyCode" placeholder="请输入图片验证码" maxlength="4" auto-complete="off" @keyup.enter="toLogin" />

                    <captcha
                        :ref="setRefs('captcha')"
                        v-model="form.captchaId"
                        class="value"
                        @change="
                            () => {
                                form.verifyCode = '';
                            }
                        "
                    />
                </el-form-item>
                <el-form-item label="">
                    <el-button round size="small" class="submit-btn" :loading="saving" @click="toLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <p class="copyright">
            Copyright © 二驴子户外 2021
            <a style="margin-left: 10px" href="https://beian.miit.gov.cn/">备案号沪ICP备2022011325号-1</a>
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import Captcha from './components/captcha.vue';
import { useEps, useCool } from '/@/cool';

export default defineComponent({
    cool: {
        route: {
            path: '/login'
        }
    },

    components: {
        Captcha
    },

    setup() {
        const { refs, setRefs, store, router, app }: any = useCool();

        const saving = ref<boolean>(false);

        // 登录表单数据
        const form = reactive({
            username: '',
            password: '',
            captchaId: '',
            verifyCode: ''
        });

        // 登录
        async function toLogin() {
            if (!form.username) {
                return ElMessage.warning('用户名不能为空');
            }

            if (!form.password) {
                return ElMessage.warning('密码不能为空');
            }

            if (!form.verifyCode) {
                return ElMessage.warning('图片验证码不能为空');
            }

            saving.value = true;

            try {
                // 登录
                await store.dispatch('userLogin', form);

                // 用户信息
                await store.dispatch('userInfo');

                // 读取Eps
                await useEps();

                // 权限菜单
                const [first] = await store.dispatch('permMenu');

                if (!first) {
                    ElMessage.error('该账号没有权限');
                } else {
                    router.push('/');
                }
            } catch (err: any) {
                ElMessage.error(err);
                refs.value.captcha.refresh();
            }

            saving.value = false;
        }

        return {
            refs,
            setRefs,
            form,
            saving,
            toLogin,
            app
        };
    }
});
</script>

<style lang="scss">
.page-login {
    height: 100vh;
    width: 100vw;
    position: relative;
    // background: #2f3447;
    background: url(../../../../../assets/bg.jpg) no-repeat center center;
    background-size: cover;
    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 500px;
        width: 500px;
        position: absolute;
        left: calc(50% - 250px);
        top: calc(50% - 250px);

        .logo {
            height: 50px;
            margin-bottom: 20px;
        }

        .desc {
            color: #17233d;
            font-size: 32px;
            margin-bottom: 30px;
            letter-spacing: 1px;
        }

        .el-form {
            // width: 300px;
            padding: 30px 30px;
            box-sizing: border-box;
            height: 500px;
            border-radius: 6px;
            border: 1px solid #d7d6dc;
            background: #fff;
            .el-form-item {
                margin-bottom: 10px;

                &__label {
                    color: #17233d;
                    font-size: 18px;
                }
            }

            .el-input {
                .el-input__inner {
                    border: 0;
                    border-bottom: 0.5px solid #666;
                    border-radius: 0;
                    padding: 0 5px;
                    background-color: transparent;
                    color: #17233d;
                    transition: border-color 0.3s;
                    position: relative;

                    &:focus {
                        border-color: #438ccb;
                        color: #438ccb;
                    }

                    &:-webkit-autofill {
                        -webkit-text-fill-color: #438ccb !important;
                        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
                        transition: background-color 50000s ease-in-out 0s;
                    }
                }
            }

            .captcha {
                position: relative;
                .value {
                    position: absolute;
                    bottom: 1px;
                    right: 0;
                    background: #17233d;
                }
            }
            ::placeholder {
                color: #808695;
            }
        }

        .submit-btn {
            margin-top: 40px;
            font-size: 18px;
            padding: 5px 40px;
            color: #fff;
            margin-top: 26px;
            width: 100%;
            height: 48px;
            background: #438ccb;
            border-radius: 32px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
        }
    }
    .copyright {
        color: #6c757d;
        font-size: 14px;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        line-height: 50px;
        width: 100%;
        text-align: center;
    }
}
</style>
