/**
 * 外部配置文件（已改为 ES 模块导出，打包后不会单独暴露）
 */
export default {
    // 授权码配置 - 请填入您的授权码
    LICENSE_CODE: '', // EZ THEME的授权码 确保下方 SiteName 修改完成

    PANEL_TYPE: 'V2board', // 可选值: 'V2board', 'Xiao-V2board' 或 'Xboard'

    API_CONFIG: {
        urlMode: 'static',
        staticBaseUrl: [
            'http://127.0.0.1'
        ],
        autoConfig: {
            useSameProtocol: true,
            appendApiPath: true,
            apiPath: '/api/v1'
        }
    },
    API_MIDDLEWARE_ENABLED: false,
    API_MIDDLEWARE_URL: 'https://panghu.com',
    API_MIDDLEWARE_PATH: '/ez/ez',

    SITE_CONFIG: {
        siteName: 'EZ THEME',
        siteDescription: 'EZ UI',
        copyright: `© ${new Date().getFullYear()} EZ THEME. All Rights Reserved.`,
        showLogo: true,
        landingText: {
            'zh-CN': '探索全球网络无限可能',
            'en-US': 'Explore Unlimited Possibilities of Global Network',
            'zh-TW': '探索全球網絡無限可能',
            'ja-JP': 'グローバルネットワークの無限の可能性',
            'ko-KR': '글로벌 네트워크의 무한한 가능성을 탐색하세요',
            'ru-RU': 'Исследуйте безграничные возможности глобальной сети',
            'fa-IR': 'امکانات نامحدود شبکه جهانی را کاوش کنید'
        },
        customLandingPage: ''
    },

    DEFAULT_CONFIG: {
        defaultLanguage: 'zh-CN',
        defaultTheme: 'light',
        primaryColor: '#355cc2',
        enableLandingPage: true
    },

    AUTH_CONFIG: {
        autoAgreeTerms: true,
        verificationCode: {
            showCheckSpamTip: true,
            checkSpamTipDelay: 1000
        },
        popup: {
            enabled: false,
            title: "用户须知 (可自定义开启)",
            content: "<p><strong>欢迎使用我们的服务！</strong></p><p>请注意以下事项：</p><ul><li>请妥善保管您的账号信息</li><li>如有问题请联系客服</li></ul>",
            cooldownHours: 0,
            closeWaitSeconds: 3
        }
    },

    AUTH_LAYOUT_CONFIG: {
        layoutType: 'center',
        splitLayout: {
            leftContent: {
                backgroundImage: 'https://www.loliapi.com/acg',
                siteName: {
                    show: true,
                    color: 'white'
                },
                greeting: {
                    show: true,
                    color: 'white'
                }
            }
        }
    },

    SHOP_CONFIG: {
        showHotSaleBadge: false,
        showPlanFeatureCards: true,
        autoSelectMaxPeriod: false,
        hidePeriodTabs: false,
        lowStockThreshold: 5,
        enableDiscountCalculation: true,
        periodOrder: [
            'three_year_price',
            'two_year_price',
            'year_price',
            'half_year_price',
            'quarter_price',
            'month_price',
            'onetime_price'
        ],
        popup: {
            enabled: true,
            title: "用户须知",
            content: "<p><strong>常规套餐默认每月订单日重置流量，您当月未用使用完的流量，不会累积到下个月</strong></p>",
            cooldownHours: 0,
            closeWaitSeconds: 0
        }
    },

    ORDER_CONFIG:{
        confirmOrder:true,
        confirmOrderContent:"<p><strong style='color: red'>无法提供相关教程和使用说明。</strong></p><p><strong style='color: red'>不会使用请勿购买，没有退款政策</strong></p>",
    },

    DASHBOARD_CONFIG: {
        showUserEmail: false,
        importButtonHighlightBtnbgcolor: false,
        enableResetTraffic: true,
        resetTrafficDisplayMode: 'low',
        lowTrafficThreshold: 10,
        enableRenewPlan: true,
        renewPlanDisplayMode: 'always',
        expiringThreshold: 7,
        showOnlineDevicesLimit: true
    },

    CLIENT_CONFIG: {
        showDownloadCard: true,
        showIOS: true,
        showAndroid: true,
        showMacOS: true,
        showWindows: true,
        showLinux: true,
        showOpenWrt: true,
        clientLinks: {
            ios: 'https://apps.apple.com/app/xxx',
            android: 'https://play.google.com/store/apps/xxx',
            macos: 'https://github.com/xxx/releases/latest',
            windows: 'https://github.com/xxx/releases/latest',
            linux: 'https://github.com/xxx/releases/latest',
            openwrt: 'https://github.com/xxx/releases/latest'
        },
        showShadowrocket: true,
        showSurge: true,
        showStash: true,
        showQuantumultX: true,
        showHiddifyIOS: true,
        showSingboxIOS: true,
        showLoon: true,
        showFlClashAndroid: true,
        showV2rayNG: true,
        showClashAndroid: true,
        showSurfboard: true,
        showClashMetaAndroid: true,
        showNekobox: true,
        showSingboxAndroid: true,
        showHiddifyAndroid: true,
        showFlClashWindows: true,
        showClashVergeWindows: true,
        showClashWindows: true,
        showNekoray: true,
        showSingboxWindows: true,
        showHiddifyWindows: true,
        showFlClashMac: true,
        showClashVergeMac: true,
        showClashX: true,
        showClashMetaX: true,
        showSurgeMac: true,
        showStashMac: true,
        showQuantumultXMac: true,
        showSingboxMac: true,
        showHiddifyMac: true
    },

    PROFILE_CONFIG: {
        showGiftCardRedeem: false,
        showRecentDevices: true
    },

    SECURITY_CONFIG: {
        enableFrontendDomainCheck: false
    },
    AUTHORIZED_DOMAINS: [
        "test.eztheme.test",
        "test1.eztheme.test",
    ],

    CAPTCHA_CONFIG: {
        captchaType: 'google',
        google: {
            verifyUrl: 'https://www.google.com/recaptcha/api/siteverify'
        },
        cloudflare: {
            verifyUrl: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        }
    },

    CUSTOM_HEADERS: {
        enabled: false,
        headers: {}
    },

    PAYMENT_CONFIG: {
        openPaymentInNewTab: true,
        qrcodeSize: 200,
        qrcodeColor: '#000000',
        qrcodeBackground: '#ffffff',
        autoCheckPayment: true,
        autoCheckInterval: 5000,
        autoCheckMaxTimes: 60,
        useSafariPaymentModal: true,
        autoSelectFirstMethod: true
    },

    WALLET_CONFIG: {
        presetAmounts: [6, 30, 68, 128, 256, 328, 648, 1280],
        defaultSelectedAmount: null,
        minimumDepositAmount: 1
    },

    INVITE_CONFIG: {
        showCommissionBadge: false,
        recordsPerPage: 10,
        inviteLinkConfig: {
            linkMode: 'auto',
            customDomain: 'https://example.com'
        }
    },

    BROWSER_RESTRICT_CONFIG: {
        enabled: true,
        restrictBrowsers: {
            '360': true,
            'QQ': true,
            'WeChat': true,
            'Baidu': true,
            'Sogou': true,
            'UC': false,
            'Maxthon': false
        },
        recommendedBrowsers: {
            'Chrome': 'https://www.google.cn/chrome/',
            'Edge': 'https://www.microsoft.com/edge'
        }
    },

    TICKET_CONFIG: {
        includeUserInfoInTicket: true,
        popup: {
            enabled: true,
            title: "工单须知",
            content: "<p>请您准确描述您的问题，再提交工单，以便我们更快帮助您。</p>",
            cooldownHours: 24,
            closeWaitSeconds: 0
        }
    },

    TRAFFICLOG_CONFIG: {
        enableTrafficLog: true,
        daysToShow: 30
    },

    NODES_CONFIG: {
        showNodeRate: true,
        showNodeDetails: false,
        allowViewNodeInfo: true
    },

    CUSTOMER_SERVICE_CONFIG: {
        enabled: false,
        type: 'crisp',
        customHtml: '',
        embedMode: 'embed',
        showWhenNotLoggedIn: true,
        iconPosition: {
            desktop: { left: '20px', bottom: '20px' },
            mobile: { right: '20px', bottom: '100px' }
        }
    },

    MORE_PAGE_CONFIG: {
        enableCustomCards: false,
        customCards: [
            {
                id: 'github',
                title: 'GitHub',
                description: '访问我们的GitHub',
                svgIcon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>',
                url: 'https://github.com',
                openInNewTab: true
            },
            {
                id: 'telegram',
                title: 'Telegram',
                description: '加入我们的Telegram频道',
                svgIcon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>',
                url: 'https://t.me/your_group',
                openInNewTab: true
            }
        ]
    }
};