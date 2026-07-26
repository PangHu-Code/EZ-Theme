<template>

  <div class="profile-container">

    <div class="profile-inner">

      <!-- 欢迎卡片 -->

      <div class="dashboard-card welcome-card">

        <div class="card-header">

          <h2 class="card-title">{{ $t('profile.title') }}</h2>

        </div>

        <div class="card-body">

          <p>{{ $t('common.welcome') }}</p>

        </div>

      </div>



      <!-- 骨架屏加载状态 -->

      <div v-if="loading" class="profile-skeleton">

        <!-- 基本信息骨架屏 -->

        <div class="profile-card">

          <div class="card-header">

            <div class="skeleton-line skeleton-title"></div>

          </div>

          <div class="skeleton-content">

            <div class="skeleton-item">

              <div class="skeleton-label"></div>

              <div class="skeleton-value"></div>

            </div>

            <div class="skeleton-item">

              <div class="skeleton-label"></div>

              <div class="skeleton-value"></div>

            </div>

          </div>

        </div>



        <!-- 设置骨架屏 -->

        <div class="profile-card">

          <div class="card-header">

            <div class="skeleton-line skeleton-title"></div>

          </div>

          <div class="skeleton-content">

            <div class="skeleton-item skeleton-setting">

              <div class="skeleton-text">

                <div class="skeleton-label"></div>

                <div class="skeleton-description"></div>

              </div>

              <div class="skeleton-toggle"></div>

            </div>

            <div class="skeleton-item skeleton-setting">

              <div class="skeleton-text">

                <div class="skeleton-label"></div>

                <div class="skeleton-description"></div>

              </div>

              <div class="skeleton-toggle"></div>

            </div>

          </div>

        </div>



        <!-- 按钮骨架屏 -->

        <div class="profile-card">

          <div class="card-header">

            <div class="skeleton-line skeleton-title"></div>

          </div>

          <div class="skeleton-content">

            <div class="skeleton-button"></div>

          </div>

        </div>

      </div>



      <!-- 错误提示 -->

      <div v-else-if="error" class="error-state">

        <IconAlertTriangle :size="48" class="error-icon" />

        <p>{{ error }}</p>

        <button class="retry-button" @click="fetchUserInfo">{{ $t('common.retry') }}</button>

      </div>



      <div v-else class="profile-content">

        <!-- 基本信息 -->

        <div class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.basicInfo') }}</h3>

          </div>

          <div class="info-content">

            <div class="info-list">

              <div class="info-item">

                <span class="info-label">{{ $t('profile.email') }}</span>

                <span class="info-value">{{ userInfo.email }}</span>

              </div>

              <div class="info-item">

                <span class="info-label">{{ $t('profile.createdAt') }}</span>

                <span class="info-value">{{ formatDate(userInfo.created_at) }}</span>

              </div>

            </div>

          </div>

        </div>



        <!-- 礼品卡兑换 -->

        <div v-if="PROFILE_CONFIG.showGiftCardRedeem" class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.giftCard') }}</h3>

          </div>

          <div class="settings-content">

            <div class="gift-card-form">

              <div class="input-group">

                <input

                  type="text"

                  v-model="giftCardCode"

                  :placeholder="$t('profile.giftCardPlaceholder')"

                  class="gift-card-input"

                />

                <button

                  class="gift-card-btn"

                  @click="redeemGiftCard"

                  :disabled="isRedeeming || !giftCardCode"

                >

                  <span v-if="isRedeeming" class="loader"></span>

                  <IconGift v-else :size="18" />

                  {{ $t('profile.giftCardSubmit') }}

                </button>

              </div>

            </div>

          </div>

        </div>



        <!-- 邮件提醒设置 -->

        <div class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.notifications') }}</h3>

          </div>

          <div class="settings-content">

            <div class="setting-item">

              <div class="setting-info">

                <span class="setting-label">{{ $t('profile.expireRemind') }}</span>

                <span class="setting-description">{{ $t('profile.expireRemindDesc') }}</span>

              </div>

              <div class="setting-toggle">

                <label class="switch" :class="{ 'disabled': updatingSettings }">

                  <input type="checkbox" v-model="remindExpire" @change="updateRemindSettings('expire')" :disabled="updatingSettings" />

                  <span class="slider round" :class="{ 'loading': updatingExpire }"></span>

                </label>

              </div>

            </div>

            <div class="setting-item">

              <div class="setting-info">

                <span class="setting-label">{{ $t('profile.trafficRemind') }}</span>

                <span class="setting-description">{{ $t('profile.trafficRemindDesc') }}</span>

              </div>

              <div class="setting-toggle">

                <label class="switch" :class="{ 'disabled': updatingSettings }">

                  <input type="checkbox" v-model="remindTraffic" @change="updateRemindSettings('traffic')" :disabled="updatingSettings" />

                  <span class="slider round" :class="{ 'loading': updatingTraffic }"></span>

                </label>

              </div>

            </div>

          </div>

        </div>



        <!-- 账号设置 -->

        <div v-if="supportsAutoRenewal" class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.accountSettings') }}</h3>

          </div>

          <div class="settings-content">

            <div class="setting-item">

              <div class="setting-info">

                <span class="setting-label">{{ $t('profile.autoRenewal') }}</span>

                <span class="setting-description">{{ $t('profile.autoRenewalDesc') }}</span>

              </div>

              <div class="setting-toggle">

                <label class="switch" :class="{ 'disabled': updatingSettings }">

                  <input type="checkbox" v-model="remindAutoRenewal" @change="updateRemindSettings('auto_renewal')" :disabled="updatingSettings" />

                  <span class="slider round" :class="{ 'loading': updatingAutoRenewal }"></span>

                </label>

              </div>

            </div>

          </div>

        </div>



        <!-- 安全设置 -->

        <div class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.security') }}</h3>

          </div>

          <div class="settings-content">

            <div class="action-buttons">

              <button class="action-btn" @click="showPasswordModal = true">

                <IconLock :size="18" />

                {{ $t('profile.changePassword') }}

              </button>

            </div>

          </div>

        </div>



        <!-- Telegram通信 -->

        <div class="profile-card" v-if="(telegramConfig?.telegram_discuss_link || (telegramBotInfo && telegramBotInfo.username)) && !loadingTelegram">

          <div class="card-header">

            <h3>{{ $t('profile.telegram') }}</h3>

          </div>

          <div class="settings-content">

            <!-- 加载状态 -->

            <div v-if="loadingTelegram" class="telegram-loading">

              <div class="skeleton-wrapper">

                <div class="skeleton-line" style="width: 80%; height: 40px; margin-bottom: 12px;"></div>

                <div class="skeleton-line" style="width: 60%; height: 40px;"></div>

              </div>

            </div>



            <!-- 正常状态 -->

            <div class="action-buttons">

              <button class="action-btn" @click="openTelegramGroup" v-if="telegramConfig?.telegram_discuss_link">

                <IconBrandTelegram :size="18" />

                {{ $t('profile.telegramGroup') }}

              </button>



              <button class="action-btn" @click="openTelegramBotModal" v-if="telegramBotInfo && telegramBotInfo.username">

                <IconBrandTelegram :size="18" />

                {{ $t('profile.telegramBot') }}

              </button>

            </div>

          </div>

        </div>



        <!-- 订阅管理 -->

        <div class="profile-card" v-if="showImportSubscription">

          <div class="card-header">

            <h3>{{ $t('profile.subscription') }}</h3>

          </div>

          <div class="settings-content">

            <div class="action-buttons">

              <button class="action-btn danger" @click="showResetModal = true">

                <IconRefresh :size="18" />

                {{ $t('profile.resetSecurity') }}

              </button>



              <button v-if="subscriptionUrl" class="action-btn" @click="copySubscriptionUrl">

                <IconCopy :size="18" />

                {{ $t('profile.copySubscription') }}

              </button>

            </div>



            <div v-if="subscriptionUrl" class="subscription-info">

              <div class="subscription-url">{{ subscriptionUrl }}</div>

            </div>

          </div>

        </div>



        <!-- 近期登录设备 -->

        <div v-if="PROFILE_CONFIG.showRecentDevices" class="profile-card">

          <div class="card-header">

            <h3>{{ $t('profile.recentDevices') }}</h3>

          </div>

          <div class="settings-content">

            <!-- 加载状态 -->

            <div v-if="loadingSessions" class="device-loading">

              <div class="session-skeleton" v-for="i in 3" :key="i">

                <div class="session-skeleton-icon"></div>

                <div class="session-skeleton-content">

                  <div class="session-skeleton-title"></div>

                  <div class="session-skeleton-info"></div>

                </div>

              </div>

            </div>



            <!-- 错误状态 -->

            <div v-else-if="sessionError" class="device-error">

              <p>{{ sessionError }}</p>

              <button class="refresh-btn" @click="fetchActiveSessions">

                {{ $t('common.retry') }}

              </button>

            </div>



            <!-- 无数据状态 -->

            <div v-else-if="activeSessions.length === 0" class="device-empty">

              <IconDevices :size="48" class="empty-icon" />

              <p>{{ $t('profile.noDevices') }}</p>

            </div>



            <!-- 数据列表 -->

            <div v-else class="device-list">

              <div v-for="(session, index) in activeSessions" :key="session.id ?? index" class="device-item">

                <div class="device-icon">

                  <component :is="getDeviceIcon(getSessionUserAgent(session))" :size="24" />

                </div>

                <div class="device-info">

                  <div class="device-name">{{ formatSessionName(session) }}</div>

                  <div class="device-meta">

                    <span v-if="getSessionIp(session)" class="device-ip">{{ getSessionIp(session) }}</span>

                    <span v-if="getSessionTimestamp(session)" class="device-time">
                      {{ formatTimestamp(getSessionTimestamp(session)) }}
                    </span>

                  </div>

                </div>

                <button
                  v-if="session.id !== undefined && session.id !== null"
                  class="remove-session-btn"
                  type="button"
                  :title="$t('profile.removeSession')"
                  :aria-label="$t('profile.removeSession')"
                  :disabled="removingSessionId === session.id"
                  @click="removeSession(session)"
                >
                  <span v-if="removingSessionId === session.id" class="loader"></span>
                  <IconTrash v-else :size="18" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>



      <!-- 修改密码弹窗 -->

      <transition name="modal-fade">

        <div v-if="showPasswordModal" class="modal-overlay" @click="showPasswordModal = false">

          <div class="modal-content" @click.stop>

            <div class="modal-header">

              <h3>{{ $t('profile.changePasswordTitle') }}</h3>

              <button class="modal-close" @click="showPasswordModal = false">

                <IconX :size="20" />

              </button>

            </div>

            <div class="modal-body">

              <div class="form-group">

                <label>{{ $t('profile.oldPassword') }}</label>

                <input

                  type="password"

                  v-model="passwordForm.oldPassword"

                  :placeholder="$t('profile.oldPassword')"

                />

              </div>

              <div class="form-group">

                <label>{{ $t('profile.newPassword') }}</label>

                <input

                  type="password"

                  v-model="passwordForm.newPassword"

                  :placeholder="$t('profile.newPassword')"

                />

              </div>

              <div class="form-group">

                <label>{{ $t('profile.confirmPassword') }}</label>

                <input

                  type="password"

                  v-model="passwordForm.confirmPassword"

                  :placeholder="$t('profile.confirmPassword')"

                />

                <div v-if="passwordMismatch" class="error-text">

                  {{ $t('profile.passwordMismatch') }}

                </div>

              </div>

            </div>

            <div class="modal-footer">

              <button class="btn-cancel" @click="showPasswordModal = false">

                {{ $t('common.cancel') }}

              </button>

              <button

                class="btn-submit"

                @click="changePassword"

                :disabled="changingPassword || !validatePasswordForm()"

              >

                <span v-if="changingPassword" class="loader"></span>

                {{ $t('common.submit') }}

              </button>

            </div>

          </div>

        </div>

      </transition>



      <!-- 重置订阅弹窗 -->

      <transition name="modal-fade">

        <div v-if="showResetModal" class="modal-overlay" @click="showResetModal = false">

          <div class="modal-content" @click.stop>

            <div class="modal-header">

              <h3>{{ $t('profile.resetSecurityTitle') }}</h3>

              <button class="modal-close" @click="showResetModal = false">

                <IconX :size="20" />

              </button>

            </div>

            <div class="modal-body">

              <p>{{ $t('profile.resetSecurityConfirm') }}</p>

            </div>

            <div class="modal-footer">

              <button class="btn-cancel" @click="showResetModal = false">

                {{ $t('common.cancel') }}

              </button>

              <button

                class="btn-submit danger"

                @click="resetSecurity"

                :disabled="resetting"

              >

                <span v-if="resetting" class="loader"></span>

                {{ $t('common.confirm') }}

              </button>

            </div>

          </div>

        </div>

      </transition>

    </div>



    <!-- 底部安全区域 -->

    <div class="bottom-safe-area"></div>

  </div>



  <!-- Telegram机器人绑定弹窗 -->

  <transition name="modal-fade">

    <div v-if="showTelegramBotModal" class="modal-overlay" @click="closeTelegramBotModal">

      <div class="modal-content" @click.stop>

        <div class="modal-header">

          <h3>{{ $t('profile.bindTelegram') }}</h3>

          <button class="modal-close" @click="closeTelegramBotModal">

            <IconX :size="20" />

          </button>

        </div>

        <div class="modal-body">

          <div class="step-container">

            <div class="step-item">

              <div class="step-number">{{ $t('profile.telegramStep1') }}</div>

              <div class="step-content">

                <p>{{ $t('profile.telegramSearchTip') }}

                  <a :href="`https://t.me/${telegramBotInfo?.username}`" target="_blank" class="tg-link">

                    @{{ telegramBotInfo?.username }}

                  </a>

                </p>

              </div>

            </div>



            <div class="step-item">

              <div class="step-number">{{ $t('profile.telegramStep2') }}</div>

              <div class="step-content">

                <p>{{ $t('profile.telegramSendCommand') }}</p>

                <div class="command-container">

                  <pre class="command-text">/bind {{ subscriptionUrl }}</pre>

                  <button class="copy-command-btn" @click="copyCommand">

                    <IconCopy :size="16" />

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div class="modal-footer">

          <button class="btn-submit" @click="closeTelegramBotModal">

            {{ $t('profile.iKnow') }}

          </button>

        </div>

      </div>

    </div>

  </transition>

</template>



<script setup name="UserProfile">

import { ref, computed, onMounted, watch } from 'vue';

import { useI18n } from 'vue-i18n';

import { useRoute, useRouter } from 'vue-router';

import {

  getUserInfo,

  changePassword as apiChangePassword,

  resetSecurity as apiResetSecurity,

  updateRemindSettings as apiUpdateRemind,

  redeemGiftCard as apiRedeemGiftCard,

  getActiveSession,

  removeActiveSession as apiRemoveActiveSession,

  getCommConfig,

  getTelegramBotInfo,

  getUserSubscribe

} from '@/api/user';

import { formatDate } from '@/utils/formatters';

import {

  IconAlertTriangle,

  IconLock,

  IconRefresh,

  IconCopy,

  IconX,

  IconGift,

  IconDevices,

  IconDeviceMobile,

  IconDeviceDesktop,

  IconBrowser,

  IconTrash,

  IconBrandTelegram

} from '@tabler/icons-vue';

import useToast from '@/hooks/useToast';

import { reloadMessages } from '@/i18n';

import { DASHBOARD_CONFIG, PROFILE_CONFIG } from '@/utils/baseConfig';



defineOptions({

  name: 'UserProfile'

});



reloadMessages();



const { t } = useI18n();

const { success, error: showError } = useToast();



const loading = ref(true);

const error = ref('');

const userInfo = ref({});

const showPasswordModal = ref(false);

const showResetModal = ref(false);

const changingPassword = ref(false);

const resetting = ref(false);

const remindExpire = ref(false);

const remindTraffic = ref(false);

const remindAutoRenewal = ref(false);

const supportsAutoRenewal = ref(false);

const subscriptionUrl = ref('');



const telegramConfig = ref({

  is_telegram: 0,

  telegram_discuss_link: ''

});

const telegramBotInfo = ref(null);

const loadingTelegram = ref(false);

const telegramError = ref('');

const showTelegramBotModal = ref(false);



const activeSessions = ref([]);

const loadingSessions = ref(false);

const sessionError = ref('');

const removingSessionId = ref(null);



const giftCardCode = ref('');

const isRedeeming = ref(false);



const updatingSettings = ref(false);

const updatingExpire = ref(false);

const updatingTraffic = ref(false);

const updatingAutoRenewal = ref(false);

const showImportSubscription = ref(DASHBOARD_CONFIG.showImportSubscription)

const passwordForm = ref({

  oldPassword: '',

  newPassword: '',

  confirmPassword: ''

});



const passwordMismatch = computed(() => {

  if (!passwordForm.value.confirmPassword) return false;

  return passwordForm.value.newPassword !== passwordForm.value.confirmPassword;

});



const validatePasswordForm = () => {

  return (

    passwordForm.value.oldPassword &&

    passwordForm.value.newPassword &&

    passwordForm.value.confirmPassword &&

    !passwordMismatch.value

  );

};



const route = useRoute();

const router = useRouter();



const fetchUserInfo = async (showLoading = true) => {

  if (showLoading) {

    loading.value = true;

  }

  error.value = '';



  try {

    const response = await getUserInfo();



    if (response && response.data) {

      userInfo.value = response.data;



      remindExpire.value = !!response.data.remind_expire;

      remindTraffic.value = !!response.data.remind_traffic;

      supportsAutoRenewal.value = Object.prototype.hasOwnProperty.call(response.data, 'auto_renewal');

      remindAutoRenewal.value = supportsAutoRenewal.value && !!response.data.auto_renewal;



      await fetchSubscribeInfo();

    } else {

      error.value = t('common.unknownError');

    }

  } catch (err) {

    console.error('Failed to fetch user info:', err);

    error.value = err?.message || t('common.networkError');



    showError(error.value);

  } finally {

    if (showLoading && !loadingTelegram.value && !loadingSessions.value) {

      loading.value = false;

    }



    checkOpenPasswordModal();

  }

};



const checkOpenPasswordModal = () => {

  if (route.query.openPasswordModal === 'true') {

    setTimeout(() => {

      showPasswordModal.value = true;



      const query = { ...route.query };

      delete query.openPasswordModal;

      router.replace({ query });

    }, 500);

  }

};



watch(() => route.query, (newQuery) => {

  if (newQuery.openPasswordModal === 'true') {

    setTimeout(() => {

      showPasswordModal.value = true;



      const query = { ...newQuery };

      delete query.openPasswordModal;

      router.replace({ query });

    }, 500);

  }

}, { immediate: true });



const fetchSubscribeInfo = async () => {

  try {

    const response = await getUserSubscribe();

    if (response && response.data) {

      subscriptionUrl.value = response.data.subscribe_url || '';

    }

  } catch (err) {

    console.error('Failed to fetch subscribe info:', err);

  }

};



const fetchTelegramInfo = async () => {

  loadingTelegram.value = true;

  telegramError.value = '';



  try {

    const configResponse = await getCommConfig();

    if (configResponse && configResponse.data) {

      telegramConfig.value = configResponse.data;

    }



    try {

      const botResponse = await getTelegramBotInfo();

      if (botResponse && botResponse.data) {

        if (botResponse.data.message && botResponse.data.message.includes('Not Found')) {

          telegramBotInfo.value = null;

        } else {

          telegramBotInfo.value = botResponse.data;

        }

      }

    } catch (botErr) {

      console.error('Failed to fetch Telegram bot info:', botErr);

      telegramBotInfo.value = null;

    }

  } catch (err) {

    console.error('Failed to fetch Telegram info:', err);

    telegramConfig.value = null;

    telegramBotInfo.value = null;

  } finally {

    loadingTelegram.value = false;

    if (!loading.value && !loadingSessions.value) {

      loading.value = false;

    }

  }

};



const openTelegramGroup = () => {

  if (telegramConfig.value && telegramConfig.value.telegram_discuss_link) {

    window.open(telegramConfig.value.telegram_discuss_link, '_blank');

  }

};



const openTelegramBotModal = () => {

  showTelegramBotModal.value = true;

};



const closeTelegramBotModal = () => {

  showTelegramBotModal.value = false;

};



const copyCommand = () => {

  if (telegramBotInfo.value && subscriptionUrl.value) {

    const command = `/bind ${subscriptionUrl.value}`;

    navigator.clipboard.writeText(command)

      .then(() => {

        success(t('profile.commandCopied'));

      })

      .catch(err => {

        console.error('Failed to copy command:', err);

        error(t('common.copyFailed'));

      });

  }

};



const updateRemindSettings = async (type) => {

  updatingSettings.value = true;



  if (type === 'expire') {

    updatingExpire.value = true;

  } else if (type === 'traffic') {

    updatingTraffic.value = true;

  } else if (type === 'auto_renewal') {

    updatingAutoRenewal.value = true;

  }



  try {

    const data = {

      remind_expire: remindExpire.value ? 1 : 0,

      remind_traffic: remindTraffic.value ? 1 : 0

    };

    if (supportsAutoRenewal.value) {

      data.auto_renewal = remindAutoRenewal.value ? 1 : 0;

    }



    const response = await apiUpdateRemind(data);



    if (response && response.data) {

      success(t('profile.updateSuccess'));

    }

  } catch (err) {

    console.error('Failed to update remind settings:', err);



    remindExpire.value = !!userInfo.value.remind_expire;

    remindTraffic.value = !!userInfo.value.remind_traffic;

    remindAutoRenewal.value = supportsAutoRenewal.value && !!userInfo.value.auto_renewal;



    showError(t('profile.updateError'));

  } finally {

    await fetchUserInfo(false);



    updatingSettings.value = false;

    updatingExpire.value = false;

    updatingTraffic.value = false;

    updatingAutoRenewal.value = false;

  }

};



const changePassword = async () => {

  if (!validatePasswordForm()) return;



  changingPassword.value = true;



  try {

    const data = {

      old_password: passwordForm.value.oldPassword,

      new_password: passwordForm.value.newPassword

    };



    const response = await apiChangePassword(data);



    if (response && response.data) {

      success(t('profile.passwordChanged'));



      passwordForm.value = {

        oldPassword: '',

        newPassword: '',

        confirmPassword: ''

      };



      showPasswordModal.value = false;

    }

  } catch (err) {

    console.error('Failed to change password:', err);



    showError(t('profile.passwordError'));

  } finally {

    changingPassword.value = false;

  }

};



const resetSecurity = async () => {

  resetting.value = true;



  try {

    const response = await apiResetSecurity();



    if (response && response.data) {

      subscriptionUrl.value = response.data;



      success(t('profile.resetSuccess'));



      showResetModal.value = false;

    }

  } catch (err) {

    console.error('Failed to reset security:', err);



    showError(t('profile.resetError'));

  } finally {

    resetting.value = false;

  }

};



const copySubscriptionUrl = () => {

  if (!subscriptionUrl.value) return;



  navigator.clipboard.writeText(subscriptionUrl.value)

    .then(() => {

      success(t('profile.subscriptionCopied'));

    })

    .catch(err => {

      console.error('Failed to copy text:', err);

    });

};



const redeemGiftCard = async () => {

  if (!giftCardCode.value) {

    showError(t('profile.giftCardEmpty'));

    return;

  }



  isRedeeming.value = true;



  try {

    const response = await apiRedeemGiftCard(giftCardCode.value);



    if (response && response.data) {

      success(t('profile.giftCardSuccess'));

      giftCardCode.value = '';


      await fetchUserInfo(false);

    }

  } catch (err) {

    console.error('Failed to redeem gift card:', err);

    showError(t('profile.giftCardError'));

  } finally {

    isRedeeming.value = false;

  }

};



const getSessionUserAgent = (session) => session?.ua || session?.user_agent || '';

const getSessionIp = (session) => session?.ip || session?.ip_address || '';

const getSessionTimestamp = (session) =>
  session?.login_at || session?.last_used_at || session?.created_at || '';

const toTimestampMilliseconds = (timestamp) => {

  if (timestamp === null || timestamp === undefined || timestamp === '') return null;

  const numericTimestamp = Number(timestamp);

  if (Number.isFinite(numericTimestamp)) {

    if (numericTimestamp < 0) return null;

    return numericTimestamp < 1000000000000
      ? numericTimestamp * 1000
      : numericTimestamp;

  }

  const parsedTimestamp = Date.parse(timestamp);

  return Number.isNaN(parsedTimestamp) ? null : parsedTimestamp;

};

const formatSessionName = (session) => {

  const userAgent = getSessionUserAgent(session);

  return userAgent ? formatDeviceInfo(userAgent) : t('profile.loginSession');

};



const fetchActiveSessions = async () => {

  loadingSessions.value = true;

  sessionError.value = '';



  try {

    const response = await getActiveSession();



    if (response && response.data) {

      const sessions = Array.isArray(response.data) ? response.data :

                      (typeof response.data === 'object' && response.data !== null ? Object.values(response.data) : []);



      const sortedSessions = sessions.sort((a, b) => {

        const aTimestamp = toTimestampMilliseconds(getSessionTimestamp(a)) || 0;
        const bTimestamp = toTimestampMilliseconds(getSessionTimestamp(b)) || 0;

        return bTimestamp - aTimestamp;

      });



      activeSessions.value = sortedSessions.slice(0, 10);

    } else {

      sessionError.value = t('profile.sessionError');

    }

  } catch (err) {

    console.error('Failed to fetch active sessions:', err);

    sessionError.value = err?.message || t('common.networkError');

  } finally {

    loadingSessions.value = false;

    if (!loading.value && !loadingTelegram.value) {

      loading.value = false;

    }

  }

};



const removeSession = async (session) => {

  if (!window.confirm(t('profile.removeSessionConfirm'))) return;

  removingSessionId.value = session.id;

  try {

    const response = await apiRemoveActiveSession(session.id);

    if (!response || response.data === false) {

      throw new Error(t('profile.removeSessionError'));

    }

    activeSessions.value = activeSessions.value.filter(item => item.id !== session.id);

    success(t('profile.removeSessionSuccess'));

  } catch (err) {

    console.error('Failed to remove active session:', err);

    showError(err?.response?.message || err?.message || t('profile.removeSessionError'));

  } finally {

    removingSessionId.value = null;

  }

};



const getDeviceIcon = (ua) => {

  if (!ua) return IconBrowser;



  const uaLower = ua.toLowerCase();



  if (uaLower.includes('iphone') || uaLower.includes('ipad') || uaLower.includes('ipod')) {

    return IconDeviceMobile;

  } else if (uaLower.includes('android')) {

    return IconDeviceMobile;

  } else if (uaLower.includes('windows')) {

    return IconDeviceDesktop;

  } else if (uaLower.includes('macintosh') || uaLower.includes('mac os')) {

    return IconDeviceDesktop;

  } else if (uaLower.includes('linux')) {

    return IconDeviceDesktop;

  } else {

    return IconBrowser;

  }

};



const formatDeviceInfo = (ua) => {

  if (!ua) return t('profile.unknownDevice');



  const uaLower = ua.toLowerCase();

  let deviceType = '';

  let browserType = '';



  if (uaLower.includes('iphone')) {

    deviceType = 'iPhone';

  } else if (uaLower.includes('ipad')) {

    deviceType = 'iPad';

  } else if (uaLower.includes('ipod')) {

    deviceType = 'iPod';

  } else if (uaLower.includes('android')) {

    deviceType = 'Android';

  } else if (uaLower.includes('windows')) {

    deviceType = 'Windows';

  } else if (uaLower.includes('macintosh') || uaLower.includes('mac os')) {

    deviceType = 'MacOS';

  } else if (uaLower.includes('linux')) {

    deviceType = 'Linux';

  } else {

    deviceType = t('profile.unknownDevice');

  }



  if (uaLower.includes('edg/') || uaLower.includes('edge/')) {

    browserType = 'Edge';

  } else if (uaLower.includes('chrome/') && !uaLower.includes('chromium/')) {

    browserType = 'Chrome';

  } else if (uaLower.includes('firefox/')) {

    browserType = 'Firefox';

  } else if (uaLower.includes('safari/') && !uaLower.includes('chrome/') && !uaLower.includes('android')) {

    browserType = 'Safari';

  } else if (uaLower.includes('opera/') || uaLower.includes('opr/')) {

    browserType = 'Opera';

  } else {

    browserType = t('profile.unknownBrowser');

  }



  return `${deviceType} - ${browserType}`;

};



const formatTimestamp = (timestamp) => {

  const timestampMilliseconds = toTimestampMilliseconds(timestamp);

  if (timestampMilliseconds === null) return '';



  try {

    const date = new Date(timestampMilliseconds);



    const options = {

      year: 'numeric',

      month: '2-digit',

      day: '2-digit',

      hour: '2-digit',

      minute: '2-digit'

    };



    return new Intl.DateTimeFormat('zh-CN', options).format(date);

  } catch (err) {

    console.error('Error formatting timestamp:', err);

    return '';

  }

};



onMounted(() => {

  loading.value = true;
  Promise.all([

    fetchUserInfo(false),

    PROFILE_CONFIG.showRecentDevices ? fetchActiveSessions() : Promise.resolve(),

    fetchTelegramInfo()

  ]).finally(() => {

    loading.value = false;

    checkOpenPasswordModal();

  });

});

</script>



<style lang="scss" scoped>

.profile-container {

  padding: 1.25rem;

  padding-bottom: calc(1.25rem + 70px);



  @media (min-width: 768px) {

    padding: 2rem;

    padding-bottom: 3rem;

  }

}



.profile-inner {

  max-width: 1200px;

  margin: 0 auto;

}





.bottom-safe-area {

  height: 20px;

  width: 100%;

  margin-top: 20px;

  margin-bottom: 60px;

  @media (min-width: 768px) {

    display: none;

  }

}





.dashboard-card {

  background-color: var(--card-bg);

  border-radius: 12px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  padding: 20px;

  margin-bottom: 24px;

  border: 1px solid var(--border-color);

  transition: all 0.3s ease;



  &:hover {

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    border-color: rgba(var(--theme-color-rgb), 0.3);

  }



  .card-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 15px;



    .card-title {

      font-size: 18px;

      font-weight: 600;

      margin: 0;

    }

  }



  .card-body {

    p {

      color: var(--text-muted);

      margin: 0;

      line-height: 1.5;

    }

  }

}



.welcome-card {

  margin-bottom: 24px;

}





.profile-skeleton {

  .profile-card {

    background-color: var(--card-bg);

    border-radius: 12px;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    border: 1px solid var(--border-color);

    margin-bottom: 24px;

    overflow: hidden;

    position: relative;



    &::after {

      content: '';

      position: absolute;

      top: 0;

      right: 0;

      bottom: 0;

      left: 0;

      transform: translateX(-100%);

      background-image: linear-gradient(

        90deg,

        rgba(255, 255, 255, 0) 0,

        rgba(255, 255, 255, 0.1) 20%,

        rgba(255, 255, 255, 0.2) 60%,

        rgba(255, 255, 255, 0) 100%

      );

      animation: shimmer 2s infinite;

      z-index: 1;

    }

  }



  .card-header {

    padding: 15px 20px;

    border-bottom: 1px solid var(--border-color);

    background-color: rgba(var(--theme-color-rgb), 0.03);



    .skeleton-title {

      height: 20px;

      width: 120px;

      border-radius: 4px;

      background-color: var(--skeleton-color);

    }

  }



  .skeleton-content {

    padding: 20px;



    .skeleton-item {

      margin-bottom: 16px;



      &:last-child {

        margin-bottom: 0;

      }



      .skeleton-label {

        height: 14px;

        width: 80px;

        border-radius: 4px;

        margin-bottom: 8px;

        background-color: var(--skeleton-color);

      }



      .skeleton-value {

        height: 16px;

        width: 150px;

        border-radius: 4px;

        background-color: var(--skeleton-color);

      }



      .skeleton-description {

        height: 12px;

        width: 200px;

        border-radius: 4px;

        margin-top: 6px;

        background-color: var(--skeleton-color);

      }

    }



    .skeleton-setting {

      display: flex;

      justify-content: space-between;

      padding: 12px 0;

      border-bottom: 1px solid rgba(var(--border-color-rgb), 0.5);



      &:last-child {

        border-bottom: none;

      }



      .skeleton-text {

        flex: 1;

        margin-right: 16px;

      }



      .skeleton-toggle {

        width: 46px;

        height: 24px;

        border-radius: 12px;

        background-color: var(--skeleton-color);

      }

    }



    .skeleton-button {

      height: 36px;

      width: 120px;

      border-radius: 8px;

      background-color: var(--skeleton-color);

    }

  }

}





:root {

  --skeleton-color: rgba(0, 0, 0, 0.1);

}



body.dark-theme {

  --skeleton-color: rgba(255, 255, 255, 0.08);

}



@keyframes shimmer {

  100% {

    transform: translateX(100%);

  }

}





.error-state {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  padding: 3rem 1rem;

  text-align: center;



  p {

    margin-top: 1rem;

    color: var(--text-muted);

    font-size: 1.1rem;

  }



  .error-icon {

    color: var(--text-muted);

    opacity: 0.7;

  }



  .retry-button {

    margin-top: 1.5rem;

    height: 40px;

    min-width: 120px;

    padding: 0 16px;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    border-radius: 8px;

    background-color: rgba(var(--theme-color-rgb), 0.85);

    color: white;

    font-weight: 500;

    font-size: 14px;

    border: 1px solid rgba(var(--theme-color-rgb), 0.3);

    box-shadow: 0 8px 20px rgba(var(--theme-color-rgb), 0.25);

    cursor: pointer;

    transition: all 0.3s ease;



    &:hover {

      transform: translateY(-2px);

      box-shadow: 0 10px 25px rgba(var(--theme-color-rgb), 0.35);

      background-color: rgba(var(--theme-color-rgb), 0.95);

    }

  }

}





.profile-card {

  background-color: var(--card-bg);

  border-radius: 12px;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  border: 1px solid var(--border-color);

  transition: all 0.3s ease;

  overflow: hidden;

  margin-bottom: 24px;



  &:hover {

    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

    border-color: rgba(var(--theme-color-rgb), 0.3);

  }



  .card-header {

    padding: 16px 20px;

    border-bottom: 1px solid var(--border-color);

    background-color: rgba(var(--theme-color-rgb), 0.03);



    h3 {

      font-size: 16px;

      font-weight: 600;

      margin: 0;

      color: var(--text-color);

    }

  }



  .info-content {

    padding: 20px;



    .info-list {

      display: grid;

      grid-template-columns: 1fr;

      grid-gap: 16px;



      @media (min-width: 768px) {

        grid-template-columns: repeat(2, 1fr);

      }



      .info-item {

        display: flex;

        flex-direction: column;



        .info-label {

          font-size: 14px;

          color: var(--text-muted);

          margin-bottom: 6px;

        }



        .info-value {

          font-size: 16px;

          font-weight: 500;

          color: var(--text-color);



          &.highlight {

            color: #f44336;

          }

        }

      }

    }

  }



  .settings-content {

    padding: 16px 20px;



    .setting-item {

      display: flex;

      justify-content: space-between;

      align-items: center;

      padding: 12px 0;

      border-bottom: 1px solid rgba(var(--border-color-rgb), 0.5);



      &:last-child {

        border-bottom: none;

      }



      .setting-info {

        flex: 1;

        margin-right: 16px;



        .setting-label {

          display: block;

          font-size: 15px;

          font-weight: 500;

          color: var(--text-color);

          margin-bottom: 4px;

        }



        .setting-description {

          font-size: 13px;

          color: var(--text-muted);

        }

      }

    }



    .action-buttons {

      display: flex;

      flex-wrap: wrap;

      gap: 12px;

      margin-bottom: 16px;



      .action-btn {

        display: flex;

        align-items: center;

        gap: 8px;

        padding: 8px 16px;

        border-radius: 8px;

        background-color: rgba(var(--theme-color-rgb), 0.1);

        color: var(--theme-color);

        border: 1px solid rgba(var(--theme-color-rgb), 0.2);

        font-size: 14px;

        font-weight: 500;

        cursor: pointer;

        transition: all 0.3s ease;



        &:hover {

          background-color: rgba(var(--theme-color-rgb), 0.2);

          transform: translateY(-2px);

        }



        &.danger {

          background-color: rgba(244, 67, 54, 0.1);

          color: #f44336;

          border-color: rgba(244, 67, 54, 0.2);



          &:hover {

            background-color: rgba(244, 67, 54, 0.2);

          }

        }

      }

    }



    .subscription-info {

      margin-top: 16px;

      padding: 12px;

      background-color: rgba(var(--theme-color-rgb), 0.05);

      border-radius: 8px;

      border: 1px dashed rgba(var(--theme-color-rgb), 0.3);



      .subscription-url {

        font-size: 14px;

        color: var(--text-color);

        word-break: break-all;

        line-height: 1.5;

      }

    }



    .gift-card-form {

      margin-top: 8px;



      .input-group {

        display: flex;

        gap: 10px;



        @media (max-width: 576px) {

          flex-direction: column;

          gap: 12px;

        }



        .gift-card-input {

          flex: 1;

          padding: 10px 12px;

          border: 1px solid var(--border-color);

          border-radius: 8px;

          background-color: var(--bg-secondary);

          color: var(--text-color);

          font-size: 15px;

          transition: all 0.3s ease;



          &:focus {

            outline: none;

            border-color: var(--theme-color);

            box-shadow: 0 0 0 3px rgba(var(--theme-color-rgb), 0.1);

          }

        }



        .gift-card-btn {

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 10px 16px;

          border-radius: 8px;

          background-color: var(--theme-color);

          color: white;

          border: none;

          font-size: 14px;

          font-weight: 500;

          cursor: pointer;

          transition: all 0.3s ease;



          @media (max-width: 576px) {

            width: 100%;

            padding: 12px 16px;

          }



          &:hover:not(:disabled) {

            background-color: rgba(var(--theme-color-rgb), 0.9);

            transform: translateY(-2px);

          }



          &:disabled {

            opacity: 0.7;

            cursor: not-allowed;

          }



          .loader {

            width: 16px;

            height: 16px;

            border: 2px solid rgba(255, 255, 255, 0.3);

            border-radius: 50%;

            border-top-color: white;

            animation: spin 1s linear infinite;

          }

        }

      }

    }

  }

}





.switch {

  position: relative;

  display: inline-block;

  width: 46px;

  height: 24px;



  &.disabled {

    opacity: 0.7;

    cursor: not-allowed;

  }



  input {

    opacity: 0;

    width: 0;

    height: 0;



    &:checked + .slider {

      background-color: var(--theme-color);

    }



    &:checked + .slider:before {

      transform: translateX(22px);

    }



    &:disabled + .slider {

      cursor: not-allowed;

    }

  }



  .slider {

    position: absolute;

    cursor: pointer;

    top: 0;

    left: 0;

    right: 0;

    bottom: 0;

    background-color: #ccc;

    transition: .4s;



    &.loading {

      overflow: hidden;



      &:before {

        animation: pulse 1.5s infinite;

      }



      &:after {

        content: "";

        position: absolute;

        width: 100%;

        height: 100%;

        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);

        animation: sweep 1.5s infinite;

      }

    }



    &:before {

      position: absolute;

      content: "";

      height: 18px;

      width: 18px;

      left: 3px;

      bottom: 3px;

      background-color: white;

      transition: .4s;

      z-index: 1;

    }



    &.round {

      border-radius: 34px;



      &:before {

        border-radius: 50%;

      }

    }

  }

}



@keyframes pulse {

  0% {

    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);

  }

  70% {

    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0);

  }

  100% {

    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);

  }

}



@keyframes sweep {

  0% {

    transform: translateX(-100%);

  }

  100% {

    transform: translateX(100%);

  }

}





.modal-overlay {

  position: fixed;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 1000;

  backdrop-filter: blur(5px);

  -webkit-backdrop-filter: blur(5px);

}



.modal-content {

  background-color: var(--card-background);

  border-radius: 12px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  width: 90%;

  max-width: 480px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

}



.modal-header {

  padding: 16px 20px;

  border-bottom: 1px solid var(--border-color);

  display: flex;

  justify-content: space-between;

  align-items: center;



  h3 {

    margin: 0;

    font-size: 18px;

    font-weight: 600;

    color: var(--text-color);

  }



  .modal-close {

    background: none;

    border: none;

    color: var(--text-muted);

    cursor: pointer;

    padding: 4px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 6px;

    transition: all 0.3s ease;



    &:hover {

      background-color: rgba(var(--theme-color-rgb), 0.1);

      color: var(--theme-color);

    }

  }

}



.modal-body {

  padding: 20px;



  p {

    color: var(--text-color);

    font-size: 15px;

    line-height: 1.6;

    margin: 0 0 16px;

  }



  .form-group {

    margin-bottom: 16px;



    &:last-child {

      margin-bottom: 0;

    }



    label {

      display: block;

      font-size: 14px;

      font-weight: 500;

      color: var(--text-color);

      margin-bottom: 8px;

    }



    input {

      width: 100%;

      padding: 10px 12px;

      border: 1px solid var(--border-color);

      border-radius: 8px;

      background-color: var(--bg-secondary);

      color: var(--text-color);

      font-size: 15px;

      transition: all 0.3s ease;



      &:focus {

        outline: none;

        border-color: var(--theme-color);

        box-shadow: 0 0 0 3px rgba(var(--theme-color-rgb), 0.1);

      }

    }



    .error-text {

      margin-top: 6px;

      color: #f44336;

      font-size: 13px;

    }

  }

}



.modal-footer {

  padding: 16px 20px;

  border-top: 1px solid var(--border-color);

  display: flex;

  justify-content: flex-end;

  gap: 12px;



  button {

    padding: 8px 16px;

    border-radius: 8px;

    font-size: 14px;

    font-weight: 500;

    cursor: pointer;

    transition: all 0.3s ease;



    &.btn-cancel {

      background-color: transparent;

      border: 1px solid var(--border-color);

      color: var(--text-color);



      &:hover {

        background-color: rgba(0, 0, 0, 0.05);

      }

    }



    &.btn-submit {

      background-color: var(--theme-color);

      border: none;

      color: white;

      display: flex;

      align-items: center;

      gap: 8px;



      &:hover:not(:disabled) {

        background-color: rgba(var(--theme-color-rgb), 0.9);

      }



      &:disabled {

        opacity: 0.7;

        cursor: not-allowed;

      }



      &.danger {

        background-color: #f44336;



        &:hover:not(:disabled) {

          background-color: #d32f2f;

        }

      }



      .loader {

        width: 16px;

        height: 16px;

        border: 2px solid rgba(255, 255, 255, 0.3);

        border-radius: 50%;

        border-top-color: white;

        animation: spin 1s linear infinite;

      }

    }

  }

}



.modal-fade-enter-active,

.modal-fade-leave-active {

  transition: opacity 0.3s ease;

}



.modal-fade-enter-from,

.modal-fade-leave-to {

  opacity: 0;

}



@keyframes spin {

  to { transform: rotate(360deg); }

}





@media (max-width: 576px) {

  .profile-container {

    padding: 1rem;

  }



  .info-content {

    padding: 16px !important;

  }

}





.device-list {

  display: flex;

  flex-direction: column;

  gap: 12px;



  .device-item {

    display: flex;

    align-items: center;

    padding: 12px;

    background-color: rgba(var(--theme-color-rgb), 0.05);

    border-radius: 8px;

    transition: all 0.3s ease;



    &:hover {

      background-color: rgba(var(--theme-color-rgb), 0.1);

      transform: translateY(-2px);

    }



    .device-icon {

      display: flex;

      align-items: center;

      justify-content: center;

      width: 40px;

      height: 40px;

      border-radius: 50%;

      background-color: rgba(var(--theme-color-rgb), 0.15);

      color: var(--theme-color);

      margin-right: 12px;

    }



    .device-info {

      flex: 1;



      .device-name {

        font-size: 15px;

        font-weight: 500;

        color: var(--text-color);

        margin-bottom: 4px;

      }



      .device-meta {

        display: flex;

        flex-wrap: wrap;

        gap: 8px;

        font-size: 13px;

        color: var(--text-muted);



        .device-ip {

          display: flex;

          align-items: center;

        }



        .device-time {

          display: flex;

          align-items: center;

        }

        .device-ip + .device-time {

          &:before {
            content: '•';

            margin-right: 8px;

          }

        }

      }

    }

    .remove-session-btn {

      width: 36px;

      height: 36px;

      margin-left: 12px;

      border: 0;

      border-radius: 8px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      color: var(--text-muted);

      background: transparent;

      cursor: pointer;

      transition: color 0.2s ease, background-color 0.2s ease;

      &:hover:not(:disabled) {

        color: #dc3545;

        background-color: rgba(220, 53, 69, 0.1);

      }

      &:disabled {

        cursor: wait;

        opacity: 0.6;

      }

      .loader {

        width: 16px;

        height: 16px;

      }

    }

  }

}





.device-loading {

  .session-skeleton {

    display: flex;

    align-items: center;

    padding: 12px;

    margin-bottom: 12px;

    background-color: rgba(var(--border-color-rgb), 0.1);

    border-radius: 8px;



    .session-skeleton-icon {

      width: 40px;

      height: 40px;

      border-radius: 50%;

      background-color: var(--skeleton-color);

      margin-right: 12px;

    }



    .session-skeleton-content {

      flex: 1;



      .session-skeleton-title {

        height: 16px;

        width: 120px;

        border-radius: 4px;

        background-color: var(--skeleton-color);

        margin-bottom: 8px;

      }



      .session-skeleton-info {

        height: 12px;

        width: 160px;

        border-radius: 4px;

        background-color: var(--skeleton-color);

      }

    }

  }

}





.device-error,

.device-empty {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  padding: 20px;

  text-align: center;



  p {

    margin: 12px 0;

    color: var(--text-muted);

  }



  .empty-icon {

    color: var(--text-muted);

    opacity: 0.7;

  }



  .refresh-btn {

    padding: 8px 16px;

    background-color: rgba(var(--theme-color-rgb), 0.1);

    color: var(--theme-color);

    border: 1px solid rgba(var(--theme-color-rgb), 0.2);

    border-radius: 8px;

    font-size: 14px;

    cursor: pointer;

    transition: all 0.3s ease;



    &:hover {

      background-color: rgba(var(--theme-color-rgb), 0.2);

    }

  }

}





.telegram-loading {

  .skeleton-wrapper {

    display: flex;

    flex-direction: column;

    gap: 12px;

    padding: 12px;

    background-color: rgba(var(--border-color-rgb), 0.1);

    border-radius: 8px;

  }

}



.telegram-error {

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  padding: 20px;

  text-align: center;



  p {

    margin: 12px 0;

    color: var(--text-muted);

  }



  .refresh-btn {

    padding: 8px 16px;

    background-color: rgba(var(--theme-color-rgb), 0.1);

    color: var(--theme-color);

    border: 1px solid rgba(var(--theme-color-rgb), 0.2);

    border-radius: 8px;

    font-size: 14px;

    cursor: pointer;

    transition: all 0.3s ease;



    &:hover {

      background-color: rgba(var(--theme-color-rgb), 0.2);

    }

  }

}





.tgbot-modal {

  max-width: 400px;

}



.step-container {

  display: flex;

  flex-direction: column;

  gap: 20px;

  width: 100%;

}



.step-item {

  display: flex;

  flex-direction: column;

  gap: 8px;

}



.step-number {

  font-size: 16px;

  font-weight: 600;

  color: var(--theme-color);

  margin-bottom: 4px;

}



.step-content {

  p {

    margin: 0 0 8px;

    color: var(--text-color);

    font-size: 14px;

    line-height: 1.5;

  }



  .tg-link {

    color: var(--theme-color);

    text-decoration: none;

    font-weight: 500;

  }

}



.command-container {

  display: flex;

  align-items: center;

  background-color: var(--bg-secondary);

  border: 1px solid var(--border-color);

  border-radius: 8px;

  padding: 10px 12px;

  position: relative;

  margin-top: 8px;



  .command-text {

    flex: 1;

    margin: 0;

    padding: 0;

    font-family: monospace;

    font-size: 14px;

    color: var(--text-color);

    white-space: pre-wrap;

    word-break: break-all;

    overflow-wrap: break-word;

    background: none;

  }



  .copy-command-btn {

    background: none;

    border: none;

    padding: 6px;

    margin-left: 8px;

    border-radius: 4px;

    color: var(--text-muted);

    cursor: pointer;

    display: flex;

    align-items: center;

    justify-content: center;

    transition: all 0.2s ease;

    flex-shrink: 0;



    &:hover {

      background-color: rgba(var(--theme-color-rgb), 0.1);

      color: var(--theme-color);

    }

  }

}



.telegram-actions {

  display: flex;

  flex-direction: column;

  gap: 12px;

  width: 100%;

}



.telegram-btn {

  display: flex;

  align-items: center;

  gap: 10px;

  background-color: var(--bg-secondary);

  border: 1px solid var(--border-color);

  color: var(--theme-color);

  border-radius: 8px;

  padding: 12px 16px;

  font-size: 14px;

  font-weight: 500;

  cursor: pointer;

  transition: all 0.3s ease;



  &:hover {

    background-color: rgba(var(--theme-color-rgb), 0.05);

  }



  .telegram-icon {

    color: var(--theme-color);

  }

}

</style>
