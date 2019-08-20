export const apiIconNavParameters = [
    {
        property: 'thyType',
        description: 'primary | secondary, primary 用于视图筛选过滤，secondary 用于详情页头部toolbar和评论图标',
        type: 'string',
        default: ''
    }
];

export const apiIconNavLinkParameters = [
    {
        property: 'thyIconNavLinkActive',
        description: '是否 Active 状态',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyIconNavLinkIcon',
        description: 'Icon 图标的名字, 如果传入了名字可以不用单独设置 <thy-icon thyIconName="xxx"></thy-icon>',
        type: 'string',
        default: ''
    }
];