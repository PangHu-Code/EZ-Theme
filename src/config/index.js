/**
 * 外部配置文件
 * index.html 中可以搜索 EZ 将其替换为您的网站名称
 * logo 摆放位置为 images/logo.png
 */

export const config  = {
    // 面板类型配置 - 请选择您使用的面板类型
    PANEL_TYPE: 'Xiao-V2board', // 可选值: 'V2board', 'Xiao-V2board' 或 'Xboard'
    // 说明:
    // 1. V2board: 标准V2board面板，使用默认请求格式
    // 2. Xiao-V2board: Xiao修改版面板，使用特殊格式的请求参数
    // 3. Xboard: Xboard面板

    // =======================================================

    // API配置
    // 可使用以下选项来配置API基础URL:
    // 1. 静态URL: 直接指定API基础URL 末尾要加 /api/v1 !!!!!!!!!!!!!!! 除非你自己改过路由要不然别不加
    // 2. 自动获取: 从当前域名自动生成API基础URL
    API_CONFIG: {
        // API URL获取方式: 'static'=使用静态URL, 'auto'=自动从当前域名获取
        urlMode: 'static',
      
        // 是否展示后端联通性检测
        showCheckBackend: true,
      
        // 静态URL模式下的基础URL (urlMode = 'static'时使用)
        // 支持字符串形式(单个API地址)或数组形式(多个备选API地址)
        // 多个地址时，会按顺序检测可用性，并使用第一个可用的地址
        staticBaseUrl: [
            'https://w5x8mu2a9943r.ezdemo.xyz/api/v1',
            'https://skhsn6q4pnv95.ezdemo.xyz/api/v1',
            'https://gy1v06omopzc8.ezdemo.xyz/api/v1'
        ],
      
        // 自动获取模式配置 (urlMode = 'auto'时使用)
        autoConfig: {
            // 是否使用相同协议 (http/https)
            useSameProtocol: true,

            // 是否拼接API路径
            appendApiPath: true,

            // API路径
            apiPath: '/api/v1'
        }
    },

    // 是否启用中间件代理API请求
    // 设置为true时，所有API请求将通过中间件转发
    API_MIDDLEWARE_ENABLED: true,
  
    //=======================================================
    // 中间件服务器URL (不含路径) 开源地址 https://github.com/codeman857/EZ-Encrypt-Middleware
    API_MIDDLEWARE_URL: 'https://d2ijw202als7c.ezdemo.xyz',
  
    // 中间件加密KEY必须是16位的16进制字符串，必须和中间件key保持一致 在线生成地址 https://www.bejson.com/math/hex_gen/
    API_MIDDLEWARE_KEY: '4c6f8e5f9467dc71',
    //=======================================================

    // 中间件路由前缀 (与中间件服务器配置保持一致)
    API_MIDDLEWARE_PATH: '/ez/ez',

    //=======================================================

    // ====================  网站基础配置  ====================
    SITE_CONFIG: {
        siteName: 'EZ THEME',
        siteDescription: 'EZ UI',
        // copyright会自动使用当前年份
        copyright: `© ${new Date().getFullYear()} EZ THEME. All Rights Reserved.`,

        // 是否显示标题中的网站Logo (true=显示, false=隐藏)
        showLogo: true,

        // Landing页面多语言标语
        landingText: {
            'zh-CN': '探索全球网络无限可能',
            'vi-VN': 'Khám phá khả năng vô hạn của mạng toàn cầu',
            'en-US': 'Explore Unlimited Possibilities of Global Network',
            'zh-TW': '探索全球網絡無限可能',
            'ja-JP': 'グローバルネットワークの無限の可能性',
            'ko-KR': '글로벌 네트워크의 무한한 가능성을 탐색하세요',
            'ru-RU': 'Исследуйте безграничные возможности глобальной сети',
            'fa-IR': 'امکانات نامحدود شبکه جهانی را کاوش کنید'
        },

        // 自定义landing页面路径（相对于public目录
        // 例如：'testlandingpage.html'
        // 如果为空则不启用自定义landing页面
        customLandingPage: ''
    },

    // 默认语言和主题配置
    DEFAULT_CONFIG: {
        // 默认语言 ('zh-CN' 或 'en-US')
        defaultLanguage: 'zh-CN',

        // 默认主题 ('light' 或 'dark')
        defaultTheme: 'light',

        // 主题色 (16进制颜色值)
        primaryColor: '#355cc2',

        // 是否启用落地页 (true=启用, false=禁用)
        enableLandingPage: true // 默认启用
    },

    // 认证页面功能配置
    AUTH_CONFIG: {
        // 是否自动勾选同意条款复选框 (true=自动勾选, false=默认不勾选)
        autoAgreeTerms: true,

        // 验证码相关配置
        verificationCode: {
            // 是否在发送验证码后显示检查垃圾邮件的提示 (true=显示, false=不显示)
            showCheckSpamTip: true,

            // 显示检查垃圾邮件提示的延迟时间(毫秒)
            checkSpamTipDelay: 1000
        },

        // 认证页面弹窗公告配置
        popup: {
            // 是否启用弹窗
            enabled: false,

            // 弹窗标题
            title: "用户须知 (可自定义开启)",

            // 弹窗内容 (支持HTML)
            content: "<p><strong>欢迎使用我们的服务！</strong></p><p>请注意以下事项：</p><ul><li>请妥善保管您的账号信息</li><li>如有问题请联系客服</li></ul>",

            // 冷却时间（小时），在此时间内不会再次显示弹窗
            cooldownHours: 0,

            // 等待时间（秒），用户需要等待多少秒才能关闭弹窗，设为0表示无需等待
            closeWaitSeconds: 3
        }
    },

    // 认证页面布局配置
    AUTH_LAYOUT_CONFIG: {
        // 布局类型: 'center' 为居中卡片布局, 'split' 为左右分栏布局
        layoutType: 'center',

        // 左右分栏布局配置 (仅当 layoutType 为 'split' 时生效)
        splitLayout: {
            // 左侧区域内容配置
            leftContent: {
                // 左侧背景图片URL或路径 (如不设置则不设置图片背景)
                backgroundImage: 'https://www.loliapi.com/acg',

                // 左上角网站名称配置
                siteName: {
                    // 是否显示网站名称
                    show: true,
                    // 文字颜色 (white或black)
                    color: 'white'
                },

                // 左下角问候语配置
                greeting: {
                    // 是否显示问候语
                    show: true,
                    // 文字颜色 (white或black)
                    color: 'white'
                }
            }
        }
    },

    // 商店页面配置
    SHOP_CONFIG: {
        // 是否在商店导航上显示热销标记
        showHotSaleBadge: false,

        // 是否显示套餐特性卡片 (true=显示, false=隐藏)
        showPlanFeatureCards: true, // 默认显示

        // 是否自动选择周期最大的标签，设为false则不会自动选择
        autoSelectMaxPeriod: false, // 默认关闭

        // 是否隐藏周期选择标签 (true=隐藏, false=显示)
        hidePeriodTabs: false, // 默认显示周期选择标签

        // 库存紧张的阈值（当库存数量小于等于此值且大于0时显示库存紧张）
        lowStockThreshold: 5,

        // 是否启用周期折扣计算显示 (true=启用, false=禁用)
        enableDiscountCalculation: true, // 默认启用

        // 价格周期的显示顺序（从大到小）
        periodOrder: [
            'three_year_price', // 三年
            'two_year_price',   // 两年
            'year_price',       // 一年
            'half_year_price',  // 半年
            'quarter_price',    // 季度
            'month_price',      // 月付
            'onetime_price'     // 一次性
        ],

        // 商店弹窗配置
        popup: {
            // 是否启用弹窗
            enabled: true,

            // 弹窗标题
            title: "用户须知",

            // 弹窗内容 (支持HTML)
            content: "<p><strong>常规套餐默认每月订单日重置流量，您当月未用使用完的流量，不会累积到下个月</strong></p>",

            // 冷却时间（小时），在此时间内不会再次显示弹窗
            cooldownHours: 0,

            // 等待时间（秒），用户需要等待多少秒才能关闭弹窗，设为0表示无需等待
            closeWaitSeconds: 0
        }
    },
    ORDER_CONFIG: {
        // 下单前二次确认
        confirmOrder: true,
        // 下单前二次确认内容
        confirmOrderContent: "<p><strong style='color: red'>无法提供相关教程和使用说明。</strong></p><p><strong style='color: red'>不会使用请勿购买，没有退款政策</strong></p>",

    },
    // 仪表盘页面配置
    DASHBOARD_CONFIG: {
        // 是否在欢迎卡片中显示用户邮箱 (true=显示, false=隐藏)
        showUserEmail: false,

        // 是否为导入订阅按钮添加高光效果和填充底色 (true=添加效果, false=不添加效果)
        importButtonHighlightBtnbgcolor: false,

        // ===============================

        // 是否启用重置流量功能 (true=启用, false=禁用)
        enableResetTraffic: true,

        // 重置流量按钮显示条件 ('always'=始终显示, 'low'=流量低于阈值时显示, 'depleted'=流量耗尽时显示)
        resetTrafficDisplayMode: 'low',

        // 低流量阈值百分比 (1-100)，当剩余流量百分比低于此值时触发低流量警告
        lowTrafficThreshold: 10,

        // ===============================

        // 是否启用续费套餐功能 (true=启用, false=禁用)
        enableRenewPlan: true,

        // 续费套餐按钮显示条件 ('always'=始终显示, 'expiring'=套餐即将过期时显示, 'expired'=套餐已过期时显示)
        renewPlanDisplayMode: 'always',

        // 即将过期的天数阈值 (1-30)，当剩余天数小于等于此值时触发即将过期警告
        expiringThreshold: 7,

        // ===============================

        // 是否显示在线设备数量限制 (true=显示, false=隐藏，仅Xiao-V2board支持)
        showOnlineDevicesLimit: true,
        
        // 是否显示导入订阅
        showImportSubscription: true,
    },

    // 客户端下载配置
    CLIENT_CONFIG: {
        // 整个下载卡片显示控制
        showDownloadCard: true,

        // 平台显示控制 (true=显示, false=隐藏)
        showIOS: true,
        showAndroid: true,
        showMacOS: true,
        showWindows: true,
        showLinux: true,
        showOpenWrt: true,

        // 客户端下载链接  //可以改成文档链接直接在新标签页打开
        clientLinks: {
            ios: 'https://apps.apple.com/app/xxx',
            android: 'https://play.google.com/store/apps/xxx',
            macos: 'https://github.com/xxx/releases/latest',
            windows: 'https://github.com/xxx/releases/latest',
            linux: 'https://github.com/xxx/releases/latest',
            openwrt: 'https://github.com/xxx/releases/latest'
        },

        // 订阅导入客户端显示控制 部分面板不支持SingBox导入请您注意检查

        // iOS平台
        showShadowrocket: true,
        showSurge: true,
        showStash: true,
        showQuantumultX: true,
        showHiddifyIOS: true,
        showSingboxIOS: true,
        showLoon: true,

        // Android平台客户端
        showFlClashAndroid: true,
        showV2rayNG: true,
        showClashAndroid: true,
        showSurfboard: true,
        showClashMetaAndroid: true,
        showNekobox: true,
        showSingboxAndroid: true,
        showHiddifyAndroid: true,

        // Windows平台客户端
        showFlClashWindows: true,
        showClashVergeWindows: true,
        showClashWindows: true,
        showNekoray: true,
        showSingboxWindows: true,
        showHiddifyWindows: true,

        // MacOS平台客户端
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

    // ================ Xiao 版本的配置 =======================

    // 用户中心页面配置
    PROFILE_CONFIG: {
        // 是否显示礼品卡兑换栏目 (true=显示, false=隐藏)
        showGiftCardRedeem: false, // 只有Xiao-V2board支持礼品卡兑换

        // 是否显示最近登录设备栏目 (true=显示, false=隐藏)
        showRecentDevices: true
    },

    // =======================================================

    // 安全配置 (仅包含前端域名授权开关，有利于保护您的主题不被别人窃取)
    SECURITY_CONFIG: {
        // 是否启用前端域名验证（前端域名检查，防止未授权域名访问）
        enableFrontendDomainCheck: false
    },

    // 授权的前端域名列表 (新增)
    AUTHORIZED_DOMAINS: [
        "test.eztheme.test",
        "test1.eztheme.test",
    ],

    // 验证码配置
    CAPTCHA_CONFIG: {
        // 验证方式: 'google' 或 'cloudflare'
        captchaType: 'google',

        // Google reCAPTCHA 配置 默认v2版本
        google: {
            // 验证API地址，可选，默认使用官方地址
            verifyUrl: 'https://www.google.com/recaptcha/api/siteverify'
        },

        // Cloudflare Turnstile 配置
        cloudflare: {
            // 验证API地址，可选，默认使用官方地址
            verifyUrl: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        }
    },

    // 自定义请求标头配置
    // 可在此添加全局自定义标头，这些标头将被添加到所有API请求中，可以搭配防火墙做验证拦截不良请求
    // 如果会配置的话建议配置一下，不会就别动了
    CUSTOM_HEADERS: {
        // 是否启用自定义标头
        enabled: false, // 默认关闭，启用前请确保服务器已配置正确的CORS策略

        // ⚠️ CORS警告：添加自定义标头将触发浏览器的预检请求(OPTIONS)
        // 服务器必须在响应中包含Access-Control-Allow-Headers字段，并列出这些自定义标头
        // 如果您控制服务器，请确保在CORS配置中添加您的自定义标头名称
        // 例如: Access-Control-Allow-Headers: "Content-Type, Authorization, X-Custom-Header, test"

        // 自定义标头列表
        // 格式: { "标头名称": "标头值" }
        // 例如: { "X-Custom-Header": "CustomValue" }
        headers: {
            // "test": "test123"
        }
    },

    // =======================================================

    // 支付相关配置
    PAYMENT_CONFIG: {
        // 是否在新标签页打开支付链接 (true=新标签页打开, false=当前页面打开)
        openPaymentInNewTab: true, // 默认开启

        // 支付二维码大小 (像素)
        qrcodeSize: 200,

        // 支付二维码的颜色
        qrcodeColor: '#000000',

        // 支付二维码的背景色
        qrcodeBackground: '#ffffff',

        // 是否自动检测支付状态 (true=启用自动检测, false=手动检测)
        autoCheckPayment: true, // 默认启用

        // 自动检测支付状态的间隔时间 (毫秒)
        autoCheckInterval: 5000, // 默认5秒

        // 自动检测支付状态的最大次数 (设置为0表示无限次)
        autoCheckMaxTimes: 60, // 默认60次

        // 是否对Safari浏览器使用支付弹窗模式，而不是直接跳转 (true=使用弹窗, false=直接跳转)
        useSafariPaymentModal: true, // 默认开启

        // 是否自动选择第一个支付方式 (true=自动选择, false=需要用户手动选择)
        // 开启后，用户进入支付页面时将自动选择列表中的第一个支付方式，无需手动点击选择
        autoSelectFirstMethod: true  // 默认开启
    },

    // 充值相关配置
    WALLET_CONFIG: {
        // 预设充值金额选项（单位：元）
        presetAmounts: [6, 30, 68, 128, 256, 328, 648, 1280],

        // 默认选中的充值金额（如果设为null则不预选金额）
        defaultSelectedAmount: null,

        // 最小充值金额（单位：元）
        minimumDepositAmount: 1
    },

    // =======================================================

    // 邀请页面配置
    INVITE_CONFIG: {
        // 是否在导航栏的邀请按钮上显示返利标记
        showCommissionBadge: false,

        // 返佣记录每页显示数量（最小值为10，API限制每次请求最少需要返回10条记录）
        recordsPerPage: 10,

        // 邀请链接配置
        inviteLinkConfig: {
            // 链接模式：'auto'=自动使用当前站点域名，'custom'=使用自定义域名
            linkMode: 'auto',
            // 自定义域名，当linkMode为'custom'时使用
            customDomain: 'https://example.com'
        }
    },

    // =======================================================

    // 浏览器访问限制配置
    BROWSER_RESTRICT_CONFIG: {
        // 是否启用浏览器限制功能
        enabled: true,

        // 各浏览器是否被限制访问（true=限制访问，false=允许访问）
        restrictBrowsers: {
            '360': true,     // 360浏览器
            'QQ': true,      // QQ浏览器
            'WeChat': true,  // 微信内置浏览器
            'Baidu': true,   // 百度浏览器
            'Sogou': true,   // 搜狗浏览器
            'UC': false,     // UC浏览器
            'Maxthon': false // 傲游浏览器
        },

        // 推荐下载的浏览器链接
        recommendedBrowsers: {
            'Chrome': 'https://www.google.cn/chrome/',
            'Edge': 'https://www.microsoft.com/edge'
        }
    },

    // 工单配置
    TICKET_CONFIG: {
        // 是否在创建工单时发送用户基础信息 (true=发送, false=不发送)
        includeUserInfoInTicket: true, // 默认发送用户信息
        // 弹窗配置
        popup: {
            // 是否启用弹窗
            enabled: true,
            // 弹窗标题
            title: "工单须知",
            // 弹窗内容 (支持HTML)
            content: "<p>请您准确描述您的问题，再提交工单，以便我们更快帮助您。</p>",
            // 冷却时间（小时），在此时间内不会再次显示弹窗
            cooldownHours: 24,
            // 等待时间（秒），用户需要等待多少秒才能关闭弹窗，设为0表示无需等待
            closeWaitSeconds: 0
        },
    },

    // 流量明细配置
    TRAFFICLOG_CONFIG: {
        // 是否启用流量明细页面 (true=启用, false=禁用)
        enableTrafficLog: true, // 默认启用

        //是否启用流量明表格 (true=启用, false=禁用）
        showTrafficTable: true, // 默认启用

        // 显示多少天的流量记录
        daysToShow: 30, // 默认显示30天

        // 流量趋势图是否聚合每日流量 (如果你的节点倍率全为1倍则无需开启)
        sumDailyTraffic: false // 默认禁用
    },

    // 节点列表配置
    NODES_CONFIG: {
        // 是否显示节点倍率 (true=显示, false=隐藏，若此处为false则allowViewNodeInfo也会为false)
        showNodeRate: true,

        // 是否显示节点详细信息（主机和端口）
        showNodeDetails: false,

        // 是否允许查看节点详细信息（控制详情按钮和模态框）
        allowViewNodeInfo: true
    },

    // 客服系统配置
    CUSTOMER_SERVICE_CONFIG: {
        // 是否启用客服系统
        enabled: false,

        // 客服系统类型: 'crisp' 或 'other'
        // 注意：当客服类型为crisp时，系统会自动向Crisp传递用户数据
        // 包括：用户邮箱、套餐名称、到期时间、可用流量、用户余额
        type: 'crisp',

        // 客服系统JS代码，请将您的客服系统提供的嵌入代码粘贴在这里
        customHtml: '',

        // 客服系统嵌入模式: 'popup'=弹出式页面, 'embed'=嵌入到每个页面
        // 'popup'模式: 点击客服图标会跳转到单独的客服页面
        // 'embed'模式: 客服窗口直接嵌入到每个页面中(仅支持Crisp)
        embedMode: 'embed',

        // 是否在未登录状态下也显示客服图标
        showWhenNotLoggedIn: true,

        // 图标位置配置
        iconPosition: {
            // 桌面版图标距离左下角的距离
            desktop: {
                left: '20px',
                bottom: '20px'
            },
            // 移动版图标距离右下角的距离
            mobile: {
                right: '20px',
                bottom: '100px'
            }
        }
    },

    // More页面自定义卡片配置
    MORE_PAGE_CONFIG: {
        // 是否启用自定义卡片功能
        enableCustomCards: false,

        // 自定义卡片列表
        // 说明:
        // 1. 每个卡片必须有唯一的id、标题、描述和URL
        // 2. 图标支持两种方式:
        //    - svgIcon: 直接插入SVG代码，推荐使用，可以自定义任何图标
        //    - icon: 使用预定义的@tabler/icons-vue图标名称（仅适用于已导入的图标）
        //    - 已导入的图标名称: IconFileText, IconShoppingCart, IconUser, IconDevices, IconSettings, IconTicket, IconLogout, IconBrandTelegram, IconBrandGithub, IconBrandDiscord, IconBrandTwitter, IconMailForward, IconChevronRight, IconServer, IconMessages, IconChartBar, IconWallet
        // 3. SVG图标应该使用 currentColor 作为颜色，以支持主题色 stroke="currentColor"
        // 4. 您可以从https://tabler.io/icons 获取图标的SVG代码
        customCards: [
            // 自定义卡片示例
            {
                id: 'github',                  // 卡片唯一ID
                title: 'GitHub',               // 卡片标题
                description: '访问我们的GitHub', // 卡片描述
                svgIcon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>',
                url: 'https://github.com',     // 点击卡片跳转的URL
                openInNewTab: true             // 是否在新标签页打开
            },
            {
                id: 'telegram',
                title: 'Telegram',
                description: '加入我们的Telegram频道',
                svgIcon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>',
                url: 'https://t.me/your_group',
                openInNewTab: true
            }
            // 可以继续添加更多卡片...
            // 主题格式，最后一个逗号要去掉
            // 使用svgIcon属性插入自定义SVG代码，确保SVG代码中使用currentColor以适应主题色
        ]
    },
};

window.EZ_CONFIG = config
