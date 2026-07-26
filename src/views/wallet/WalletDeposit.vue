<template>
  <div class="deposit-container">
    <div class="deposit-inner">
      <!-- 欢迎卡片 -->
      <div class="dashboard-card welcome-card">
        <div class="card-header">
          <h2 class="card-title">{{ $t('wallet.welcome.title') || '账户充值' }}</h2>
        </div>
        <div class="card-body">
          <p>{{ $t('wallet.welcome.description') || '在这里您可以轻松地为您的账户充值，选择预设金额或输入自定义金额进行充值。充值后的余额将立即到账并可用于购买我们的服务。' }}</p>
        </div>
      </div>

      <!-- 余额信息卡片 -->
      <div class="dashboard-card balance-card">
        <div class="card-header">
          <h2 class="card-title">{{ $t('wallet.balance.title') }}</h2>
        </div>
        <div class="card-body">
          <!-- 余额信息 - 已加载 -->
          <div class="balance-display" v-if="!loading.balance">
            <div class="balance-value">{{ currencySymbol }}{{ formatAmount(userBalance) }}</div>
            <div class="balance-label">{{ $t('wallet.balance.description') }}</div>
          </div>

          <!-- 余额信息 - 骨架屏 -->
          <div class="balance-skeleton" v-else>
            <div class="skeleton-balance-value"></div>
            <div class="skeleton-balance-label"></div>
          </div>

          <!-- 自动续费设置 -->
          <div v-if="supportsAutoRenewal" class="balance-setting">
            <div class="setting-item">
              <div class="setting-info">
                <span class="setting-label">{{ $t('profile.autoRenewal') }}</span>
                <span class="setting-description">{{ $t('profile.autoRenewalDesc') }}</span>
              </div>
              <div class="setting-toggle">
                <label class="switch" :class="{ 'disabled': updatingAutoRenewal }">
                  <input 
                    type="checkbox" 
                    v-model="autoRenewal" 
                    @change="updateAutoRenewal" 
                    :disabled="updatingAutoRenewal" 
                  />
                  <span class="slider round" :class="{ 'loading': updatingAutoRenewal }"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 充值卡片 -->
      <div class="dashboard-card deposit-card">
        <div class="card-header">
          <h2 class="card-title">{{ $t('wallet.deposit.title') }}</h2>
        </div>
        <div class="card-body">
          <!-- 充值说明 -->
          <div class="deposit-notice">
            <IconAlertCircle :size="20" class="notice-icon" />
            <span>{{ $t('wallet.deposit.notice') }}</span>
          </div>

          <!-- 预设金额选择 -->
          <div class="amount-selection">
            <div class="period-cards">
              <!-- 骨架屏 - 当货币符号加载中显示 -->
              <template v-if="loading.config">
                <div v-for="i in 4" :key="`skeleton-${i}`" class="period-card skeleton-card">
                  <div class="period-card-inner">
                    <div class="skeleton-price"></div>
                  </div>
                </div>
              </template>
              <!-- 实际金额卡片 - 加载完成后显示 -->
              <template v-else>
                <div
                  v-for="(amount, index) in presetAmounts"
                  :key="index"
                  class="period-card"
                  :class="{ active: selectedAmount === amount }"
                  @click="selectAmount(amount)"
                >
                  <div class="period-card-inner">
                    <div class="period-price">
                      <span class="currency">{{ currencySymbol }}</span>
                      <span class="amount">{{ amount }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- 自定义金额输入 -->
          <div class="custom-amount">
            <label for="customAmount">{{ $t('wallet.deposit.customAmount') }}</label>
            <!-- 骨架屏 - 当货币符号加载中显示 -->
            <div v-if="loading.config" class="input-container skeleton-input">
              <div class="skeleton-input-field"></div>
            </div>
            <!-- 实际输入框 - 加载完成后显示 -->
            <div v-else class="input-container">
              <span class="currency-symbol">{{ currencySymbol }}</span>
              <input
                id="customAmount"
                v-model="customAmount"
                type="number"
                min="1"
                :placeholder="$t('wallet.deposit.customAmountPlaceholder')"
                @input="onCustomAmountInput"
              />
            </div>
            <small v-if="amountError" class="error-message">{{ amountError }}</small>
          </div>

          <!-- 充值按钮 -->
          <div class="deposit-actions">
            <!-- 骨架屏 - 当货币符号加载中显示 -->
            <div v-if="loading.config" class="btn-order-skeleton"></div>
            <!-- 实际按钮 - 加载完成后显示 -->
            <button 
              v-else
              class="btn-order"
              :disabled="loading.submitting || !isValidAmount || parseFloat(customAmount) < minimumDepositAmount"
              @click="handleDeposit"
            >
              <IconShoppingCart v-if="!loading.submitting" :size="18" />
              <span v-else class="loader"></span>
              <span>{{ $t('wallet.deposit.button') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="WalletDeposit">
import { ref, computed, onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from '@/composables/useToast';
import { IconAlertCircle, IconShoppingCart } from '@tabler/icons-vue';
import { getUserInfo, updateRemindSettings as apiUpdateRemind } from '@/api/user';
import { createOrderDeposit, getUserConfig } from '@/api/wallet';
import { isXiaoV2board } from '@/utils/baseConfig';
import { useRouter } from 'vue-router';
import { WALLET_CONFIG } from '@/utils/baseConfig';
const { t } = useI18n();
const { showToast } = useToast();
const router = useRouter();
const isXiaoPanel = isXiaoV2board();
if (!isXiaoPanel) {
  router.push('/dashboard');
}
const userBalance = ref(0);
const currencySymbol = ref('$');
const presetAmounts = ref(WALLET_CONFIG.presetAmounts || [6, 30, 68, 128, 256, 328, 648, 1280]);
const selectedAmount = ref(WALLET_CONFIG.defaultSelectedAmount || null);
const customAmount = ref('');
const amountError = ref('');
const minimumDepositAmount = WALLET_CONFIG.minimumDepositAmount || 1;
const autoRenewal = ref(false);
const supportsAutoRenewal = ref(false);
const updatingAutoRenewal = ref(false);
const loading = reactive({
  balance: true,
  submitting: false,
  config: true
});
const fetchUserConfig = async () => {
  try {
    const response = await getUserConfig();
    if (response && response.data && response.data.currency_symbol) {
      currencySymbol.value = response.data.currency_symbol;
    }
  } catch (error) {
    console.error('获取用户配置失败:', error);
  } finally {
    loading.config = false;
  }
};
const formatAmount = (amount) => {
  return (parseFloat(amount) / 100).toFixed(2);
};
const selectAmount = (amount) => {
  selectedAmount.value = amount;
  customAmount.value = '';
  amountError.value = '';
};
const onCustomAmountInput = () => {
  selectedAmount.value = null;
  
  if (customAmount.value === '') {
    amountError.value = '';
    return;
  }
  
  const amount = parseFloat(customAmount.value);
  if (isNaN(amount) || amount <= 0) {
    amountError.value = t('wallet.deposit.amountError.invalid');
  } else if (amount < minimumDepositAmount) {
    amountError.value = t('wallet.deposit.amountError.minimum').replace('1', minimumDepositAmount);
  } else {
    amountError.value = '';
  }
};
const currentAmount = computed(() => {
  if (selectedAmount.value) {
    return selectedAmount.value;
  }
  
  if (customAmount.value && parseFloat(customAmount.value) >= 1) {
    return parseFloat(customAmount.value);
  }
  
  return null;
});
const isValidAmount = computed(() => {
  return currentAmount.value !== null;
});
const fetchUserBalance = async () => {
  loading.balance = true;
  try {
    const response = await getUserInfo();
    if (response && response.data) {
      userBalance.value = response.data.balance || 0;
      supportsAutoRenewal.value = Object.prototype.hasOwnProperty.call(response.data, 'auto_renewal');
      autoRenewal.value = supportsAutoRenewal.value && !!response.data.auto_renewal;
    }
  } catch (error) {
    console.error('获取用户余额失败:', error);
    showToast(error.response?.message || error.message || t('errors.serverError') || t('common.error_occurred'), 'error');
  } finally {
    loading.balance = false;
  }
};

/**
 * 更新自动续费设置
 */
const updateAutoRenewal = async () => {
  if (!supportsAutoRenewal.value) return;

  updatingAutoRenewal.value = true;
  
  try {
    const data = {
      auto_renewal: autoRenewal.value ? 1 : 0
    };
    
    const response = await apiUpdateRemind(data);
    
    if (response && response.data) {
      showToast(t('profile.updateSuccess'), 'success');
    }
  } catch (error) {
    console.error('更新自动续费设置失败:', error);
    
    // 回滚状态
    autoRenewal.value = !autoRenewal.value;
    
    showToast(error.response?.message || error.message || t('profile.updateError'), 'error');
  } finally {
    updatingAutoRenewal.value = false;
  }
};
const handleDeposit = async () => {
  if (!isValidAmount.value) {
    showToast(t('validation.required').replace('{field}', t('wallet.deposit.title')) || t('wallet.deposit.amountError.required'), 'warning');
    return;
  }
  
  try {
    loading.submitting = true;
    
    const amountInCents = Math.round(currentAmount.value * 100);
    
    const response = await createOrderDeposit(amountInCents);
    
    if (response && response.data) {
      const orderId = response.data;
      showToast(t('wallet.deposit.success'), 'success');
      
      router.push({
        path: '/payment',
        query: { 
          trade_no: orderId,
          type: 'deposit'
        }
      });
    }
  } catch (error) {
    console.error('创建充值订单失败:', error);
    showToast(error.response?.message || error.message || t('errors.serverError') || t('wallet.deposit.failed'), 'error');
  } finally {
    loading.submitting = false;
  }
};
onMounted(() => {
  fetchUserBalance();
  fetchUserConfig();
});
</script>
<style lang="scss" scoped>
.deposit-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
  
  .deposit-inner {
    width: 100%;
    max-width: 1200px;
  }
  
  .dashboard-card {
    background-color: var(--card-bg-color);
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
    
    &.glassmorphism {
      background-color: rgba(var(--card-background-rgb, 255, 255, 255), 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      will-change: backdrop-filter, background-color;
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
  }
  
  .welcome-card {
    margin-bottom: 24px;
    
    .card-body {
      p {
        color: var(--secondary-text-color);
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
      }
    }
  }
  
  .balance-card {
    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 25px;
      gap: 20px;
    }
    
    .balance-display {
      text-align: center;
      
      .balance-value {
        font-size: 3.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 12px;
        text-shadow: 0 2px 4px rgba(var(--theme-color-rgb), 0.1);
      }
      
      .balance-label {
        font-size: 1.1rem;
        color: var(--secondary-text-color);
      }
    }
    
    
    .balance-skeleton {
      width: 100%;
      text-align: center;
      
      .skeleton-balance-value {
        height: 3.5rem;
        width: 200px;
        margin: 0 auto 12px;
        background-color: var(--skeleton-bg, rgba(0, 0, 0, 0.05));
        border-radius: 10px;
        position: relative;
        overflow: hidden;
      }
      
      .skeleton-balance-label {
        height: 1.1rem;
        width: 160px;
        margin: 0 auto;
        background-color: var(--skeleton-bg, rgba(0, 0, 0, 0.05));
        border-radius: 10px;
        position: relative;
        overflow: hidden;
      }
      
      .skeleton-balance-value, .skeleton-balance-label {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 30%;
          background: linear-gradient(90deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0) 100%);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
          will-change: transform;
        }
      }
    }

    .balance-setting {
      width: 100%;
      padding-top: 15px;
      border-top: 1px solid var(--border-color);
      
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        
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
            color: var(--secondary-text-color);
          }
        }
        
        .setting-toggle {
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
              border-radius: 34px;
              
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
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  
  .deposit-card {
    .card-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .deposit-notice {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background-color: rgba(var(--theme-color-rgb), 0.1);
      border-radius: 8px;
      
      .notice-icon {
        color: var(--primary-color);
      }
      
      span {
        font-size: 0.9rem;
      }
    }
    
    
    .amount-selection {
      margin-bottom: 10px;
      width: 100%;
      
      .period-cards {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 15px;
        width: 100%;
        
        .period-card {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid var(--border-color);
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          
          &.active {
            border-color: var(--theme-color);
            box-shadow: 0 5px 15px rgba(var(--theme-color-rgb), 0.15);
            
            .period-card-inner {
              background-color: rgba(var(--theme-color-rgb), 0.1);
            }
            
            .period-price {
              .currency,
              .amount {
                color: var(--theme-color);
              }
            }
          }
          
          &:hover {
            border-color: rgba(var(--theme-color-rgb), 0.5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }
          
          .period-card-inner {
            padding: 16px 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            transition: background-color 0.3s ease;
          }
          
          .period-price {
            display: flex;
            align-items: baseline;
            justify-content: center;
            
            .currency {
              font-size: 14px;
              font-weight: 600;
              color: var(--text-color);
              margin-right: 2px;
            }
            
            .amount {
              font-size: 20px;
              font-weight: 700;
              color: var(--text-color);
            }
          }
        }
      }
    }
    
    .custom-amount {
      margin-top: 15px;
      
      label {
        display: block;
        font-size: 0.95rem;
        color: var(--secondary-text-color);
        margin-bottom: 10px;
        font-weight: 500;
      }
      
      .input-container {
        position: relative;
        display: flex;
        align-items: center;
        height: 50px;
        
        .currency-symbol {
          position: absolute;
          left: 15px;
          color: var(--text-color);
          font-weight: 600;
          font-size: 1.2rem;
        }
        
        input {
          width: 100%;
          height: 100%;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          background-color: var(--input-bg, rgba(0, 0, 0, 0.02));
          padding: 0 15px 0 35px;
          font-size: 1.2rem;
          color: var(--text-color);
          transition: all 0.3s ease;
          
          &:hover {
            border-color: rgba(var(--theme-color-rgb), 0.3);
          }
          
          &:focus {
            outline: none;
            border-color: var(--theme-color);
            box-shadow: 0 0 0 4px rgba(var(--theme-color-rgb), 0.15);
          }
          
          &::placeholder {
            color: rgba(var(--text-color-rgb), 0.4);
          }
        }
      }
      
      .error-message {
        display: block;
        margin-top: 8px;
        color: var(--danger-color, #ff4757);
        font-size: 0.85rem;
      }
    }
    
    
    .deposit-actions {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      
      .btn-order {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background-color: var(--theme-color);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0 30px;
        height: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 200px;
        box-shadow: 0 4px 12px rgba(var(--theme-color-rgb), 0.3);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(var(--theme-color-rgb), 0.4);
        }
        
        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(var(--theme-color-rgb), 0.3);
        }
        
        &:disabled {
          background-color: var(--disabled-bg, #cccccc);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
      }
    }
  }
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
.dark-theme {
  .skeleton-balance-value,
  .skeleton-balance-label,
  .skeleton-price,
  .skeleton-input-field {
    background-color: rgba(255, 255, 255, 0.08);
    
    &::after {
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.05) 50%, 
        rgba(255, 255, 255, 0) 100%);
    }
  }
}
@media (max-width: 768px) {
  .deposit-container {
    padding: 15px;
    padding-bottom: 100px;
    
    .balance-card {
      .balance-display {
        .balance-value {
          font-size: 2.5rem;
        }
      }
    }
    
    .deposit-card {
      .amount-selection {
        .period-cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    }
  }
}
.skeleton-card {
  cursor: default;
  border: 2px solid var(--border-color);
  position: relative;
  overflow: hidden;
  
  .skeleton-price {
    height: 24px;
    width: 80%;
    margin: 0 auto;
    background-color: var(--skeleton-bg, rgba(0, 0, 0, 0.05));
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 30%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.15) 50%, 
        rgba(255, 255, 255, 0) 100%);
      transform: translateX(-100%);
      animation: shimmer 2s infinite;
      will-change: transform;
    }
  }
  
  &:hover {
    transform: none;
    box-shadow: none;
  }
}
.skeleton-input {
  height: 50px;
  position: relative;
  overflow: hidden;
  
  .skeleton-input-field {
    width: 100%;
    height: 100%;
    border: 2px solid var(--border-color);
    border-radius: 12px;
    background-color: var(--skeleton-bg, rgba(0, 0, 0, 0.05));
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 30%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.15) 50%, 
        rgba(255, 255, 255, 0) 100%);
      transform: translateX(-100%);
      animation: shimmer 2s infinite;
      will-change: transform;
    }
  }
}
.btn-order-skeleton {
  height: 50px;
  min-width: 200px;
  border-radius: 12px;
  background-color: var(--skeleton-bg, rgba(0, 0, 0, 0.05));
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 30%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.15) 50%, 
      rgba(255, 255, 255, 0) 100%);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
    will-change: transform;
  }
}
</style>
