import type { AppStateOptions } from '@khsura/sui'
import {
  addImports,
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponent,
} from '@nuxt/kit'

export default defineNuxtModule<AppStateOptions>({
  meta: {
    name: 'sui',
    configKey: 'sui',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  setup: async (options, nuxt) => {
    nuxt.options.runtimeConfig.public.sui = options

    const resolver = createResolver(import.meta.url)

    await Promise.all(
      [
        'SAlert',
        'SApp',
        'SAppBar',
        'SAutocomplete',
        'SAppBarTitle',
        'SBadge',
        'SBreadcrumbs',
        'SButton',
        'SCalendar',
        'SCard',
        'SCardActions',
        'SCardSubtitle',
        'SCardText',
        'SCardTitle',
        'SCheckbox',
        'SChip',
        'SColumn',
        'SContainer',
        'SDatePicker',
        'SDatePickerInput',
        'SDialog',
        'SDivider',
        'SExpansionPanel',
        'SExpansionPanelContent',
        'SExpansionPanelHeader',
        'SExpansionPanels',
        'SFooter',
        'SForm',
        'SFormInputError',
        'SIcon',
        'SImage',
        'SImageLoader',
        'SInput',
        'SList',
        'SListItem',
        'SListItemAction',
        'SListItemContent',
        'SListItemGroup',
        'SListItemIcon',
        'SListItemSubtitle',
        'SListItemTitle',
        'SMain',
        'SMenu',
        'SNavigationDrawer',
        'SNumberInput',
        'SPinInput',
        'SProgressCircular',
        'SProgressLinear',
        'SRadio',
        'SRadioGroup',
        'SRow',
        'SSelect',
        'SSheet',
        'SSlideGroup',
        'SSlideItem',
        'SSnackbar',
        'SSpacer',
        'SStepper',
        'SStepperStep',
        'SSubheader',
        'SSwitch',
        'STab',
        'STable',
        'STabs',
        'SToggleButton',
        'SToggleButtonGroup',
        'SToolbar',
        'SToolbarTitle',
        'STooltip',
        'STextarea',
        'STransaction',
        'SOverlay',
      ].map(async (componentName) => {
        addComponent({
          name: componentName,
          export: componentName,
          filePath: '@khsura/sui',
        })
      }),
    )

    addImports([
      ...['useDisplay', 'STransition', 'useTheme'].map((name) => {
        return { from: '@khsura/sui', name }
      }),
      ...[
        'GroupItemValue',
        'SForm',
        'SFormInputModelValueRule',
        'SInput',
        'SSelect',
        'TableHeader',
        'TableItem',
        'MaterialDesignIcon',
      ].map((name) => {
        return { from: '@khsura/sui', name, type: true }
      }),
    ])

    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.css.unshift('@khsura/sui/style.scss')
    nuxt.options.css.unshift('@khsura/sui/style.css')
  },
})
