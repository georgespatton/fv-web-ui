import React from 'react'
import selectn from 'selectn'
import Immutable from 'immutable'
import ProviderHelpers from 'common/ProviderHelpers'
import NavigationHelpers from 'common/NavigationHelpers'
import IntlService from 'common/services/IntlService'

import * as Pages from 'common/conf/pagesIndex'
import { ServiceShortURL } from 'common/services'
import { WORKSPACES, SECTIONS } from 'common/Constants'

import Suspender from 'components/Suspender'
const intl = IntlService.instance

/**
 * Tests to see if current URL matches route.
 * Return object with matched boolean and route params returned
 *
 * Input:
 *  pathMatchArray:
 *    ['nuxeo', 'app'],
 *    ['nuxeo', 'app', 'content', { id: 'friendly_url', matcher: {} }],
 *
 *  urlPath:
 *    ['nuxeo', 'app', 'explore', 'FV', 'sections', 'Data', 'Athabascan', 'Dene', 'Dene', 'learn','words']
 *
 * Output:
 *  { matched: false, routeParams: {} }
 *  { matched: matched, routeParams: matchedRouteParams }
 */
export const matchPath = (pathMatchArray, urlPath) => {
  // Remove empties from path array, return Immutable list
  const currentPathArray = Immutable.fromJS(
    urlPath.filter((e) => {
      return e
    })
  )
  // NOTE: should this `return { matched: false, routeParams: {} }` for consistency?
  if (!pathMatchArray) {
    return false
  }

  if (pathMatchArray.size !== currentPathArray.size) {
    return { matched: false, routeParams: {} }
  }

  const matchedRouteParams = {}

  const matched = pathMatchArray.every((value, key) => {
    if (value instanceof RegExp) {
      return value.test(currentPathArray.get(key))
    } else if (value instanceof paramMatch) {
      // eslint-disable-next-line
      if (value.hasOwnProperty('matcher')) {
        const testMatch = value.matcher.test(currentPathArray.get(key))

        if (testMatch) {
          matchedRouteParams[value.id] = decodeURI(currentPathArray.get(key))
          return true
        }
      }

      return false
    }
    return value === currentPathArray.get(key)
  })

  return { matched: matched, routeParams: matchedRouteParams }
}
/**
 * Parameter matching class
 */
export class paramMatch {
  constructor(id, matcher) {
    this.id = id
    this.matcher = matcher
  }
}

// Regex helper
const ANYTHING_BUT_SLASH = new RegExp(ProviderHelpers.regex.ANYTHING_BUT_SLASH)
const NUMBER = new RegExp(ProviderHelpers.regex.NUMBER)
const WORKSPACE_OR_SECTION = new RegExp(ProviderHelpers.regex.WORKSPACE_OR_SECTION)
const KIDS_OR_DEFAULT = new paramMatch('siteTheme', RegExp(ProviderHelpers.regex.KIDS_OR_DEFAULT))
const KIDS = new paramMatch('siteTheme', RegExp(ProviderHelpers.regex.KIDS))
const DEFAULT = new paramMatch('siteTheme', RegExp(ProviderHelpers.regex.DEFAULT))

const WORKSPACE_TO_SECTION_REDIRECT = {
  condition: (params) => {
    // Condition 1: Guest and trying to access Workspaces
    return selectn('isConnected', params.props.computeLogin) === false && NavigationHelpers.isWorkspace(params.props)
  },
  target: (params) => {
    return '/' + params.props.splitWindowPath.join('/').replace(WORKSPACES, SECTIONS)
  },
}

// Common Paths
const DIALECT_PATH_KIDS_OR_DEFAULT = [
  KIDS_OR_DEFAULT,
  'FV',
  new paramMatch('area', WORKSPACE_OR_SECTION),
  'Data',
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
]
const DIALECT_PATH_ONLY_DEFAULT = [
  DEFAULT,
  'FV',
  new paramMatch('area', WORKSPACE_OR_SECTION),
  'Data',
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
]
const DIALECT_PATH_ONLY_KIDS = [
  KIDS,
  'FV',
  new paramMatch('area', WORKSPACE_OR_SECTION),
  'Data',
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
  ANYTHING_BUT_SLASH,
]
const PAGINATION_PATH = [new paramMatch('pageSize', NUMBER), new paramMatch('page', NUMBER)]

// Common Routes
const DIALECT_LEARN_WORDS = {
  path: [...DIALECT_PATH_KIDS_OR_DEFAULT, 'learn', 'words'],
  title:
    intl.translate({
      key: 'words',
      default: 'Words',
      case: 'words',
    }) + ' | {$dialect_name}',
  page: (
    <Suspender>
      <Pages.PageDialectLearnWords />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}
const DIALECT_LEARN_WORDS_ONLY_DEFAULT = {
  path: [...DIALECT_PATH_ONLY_DEFAULT, 'learn', 'words'],
  title:
    intl.translate({
      key: 'words',
      default: 'Words',
      case: 'words',
    }) + ' | {$dialect_name}',
  page: (
    <Suspender>
      <Pages.PageDialectLearnWords />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}
const DIALECT_LEARN_WORDS_ONLY_KIDS = {
  path: [...DIALECT_PATH_ONLY_KIDS, 'learn', 'words'],
  title:
    intl.translate({
      key: 'words',
      default: 'Words',
      case: 'words',
    }) + ' | {$dialect_name}',
  page: (
    <Suspender>
      <Pages.WordsCategoriesGrid.Container />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}

const DIALECT_LEARN_PHRASES = {
  path: [...DIALECT_PATH_KIDS_OR_DEFAULT, 'learn', 'phrases'],
  title:
    intl.translate({
      key: 'views.pages.explore.dialect.learn.phrases.page_title',
      default: 'Phrases',
      case: 'words',
    }) + ' | {$dialect_name}',
  page: (
    <Suspender>
      <Pages.PageDialectLearnPhrases />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}

const DIALECT_IMMERSION_WORDS = {
  path: [...DIALECT_PATH_KIDS_OR_DEFAULT, 'immersion'],
  title: 'Immersion', // TODOSL add locale for this
  page: (
    <Suspender>
      <Pages.PageDialectImmersionList />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}

const SEARCH = {
  path: [
    KIDS_OR_DEFAULT,
    'FV',
    new paramMatch('area', WORKSPACE_OR_SECTION),
    'Data',
    'search',
    new paramMatch('searchTerm', ANYTHING_BUT_SLASH),
  ],
  title:
    "'{$searchTerm}' " +
    intl.translate({
      key: 'views.pages.search.search_results',
      default: 'Search Results',
      case: 'words',
    }),

  page: (
    <Suspender>
      <Pages.PageSearch />
    </Suspender>
  ),
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}
const SEARCH_DIALECT = {
  path: [
    KIDS_OR_DEFAULT,
    'FV',
    new paramMatch('area', WORKSPACE_OR_SECTION),
    'Data',
    ANYTHING_BUT_SLASH,
    ANYTHING_BUT_SLASH,
    ANYTHING_BUT_SLASH,
    'search',
    new paramMatch('searchTerm', ANYTHING_BUT_SLASH),
  ],
  title:
    "'{$searchTerm}' " +
    intl.translate({
      key: 'views.pages.search.search_results',
      default: 'Search Results',
      case: 'words',
    }) +
    ' | {$dialect_name} ',
  page: (
    <Suspender>
      <Pages.PageSearch />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}
const REPORT_VIEW = {
  path: [...DIALECT_PATH_KIDS_OR_DEFAULT, 'reports', new paramMatch('reportName', ANYTHING_BUT_SLASH)],
  title:
    '{$reportName} | ' +
    intl.translate({
      key: 'reports',
      default: 'Reports',
      case: 'words',
    }) +
    ' | {$dialect_name}',
  page: (
    <Suspender>
      <Pages.PageDialectReportsView />
    </Suspender>
  ),
  extractPaths: true,
  redirects: [WORKSPACE_TO_SECTION_REDIRECT],
}

// TODO: VERIFY THIS WORKS!
// Adds a pagination route to an existing route
const addPagination = (route) => {
  return Object.assign({}, route, {
    path: [...route.path, ...PAGINATION_PATH],
    // page: React.cloneElement(route.page, { hasPagination: true }),
    page: <Suspender>{React.cloneElement(route.page, { hasPagination: true })}</Suspender>,
    breadcrumbPathOverride: (pathArray) => {
      return pathArray.slice(0, pathArray.length - 2)
    },
  })
}

// Category page
const addCategory = (route) => {
  return Object.assign({}, route, {
    path: route.path.concat(['categories', new paramMatch('category', ANYTHING_BUT_SLASH)]),
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.words.page_title_category',
        default: 'Category View',
        case: 'words',
      }) + ` | ${selectn('title', route)}`,
  })
}

const addCategoryKids = (route) => {
  return Object.assign({}, route, {
    path: [...DIALECT_PATH_ONLY_KIDS, 'learn', 'words', 'categories', new paramMatch('category', ANYTHING_BUT_SLASH)],
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.words.page_title_category',
        default: 'Category View',
        case: 'words',
      }) +
      ' | ' +
      selectn('title', route),
    page: (
      <Suspender>
        <Pages.KidsWordsByCategory />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  })
}

const addImmersionCategory = (route) => {
  return Object.assign({}, route, {
    path: route.path.concat(['categories', new paramMatch('category', ANYTHING_BUT_SLASH)]),
    title: 'Immersion Categories', // TODOSL locale translation template
  })
}

// EXPLORE: Phrasebook, eg: /explore/.../learn/phrases/book/[uid]
const addBrowsePhraseBook = (route) => {
  return Object.assign({}, route, {
    path: [...DIALECT_PATH_ONLY_DEFAULT, 'learn', 'phrases', 'book', new paramMatch('phraseBook', ANYTHING_BUT_SLASH)],
    title: `${intl.translate({
      key: 'views.pages.explore.dialect.learn.phrases.page_title_phrase_book',
      default: 'Browsing by Phrase Book',
      case: 'words',
    })} | ${intl.translate({
      key: 'views.pages.explore.dialect.learn.phrases.page_title',
      default: 'Phrases',
      case: 'words',
    })} | {$dialect_name}`,
    page: (
      <Suspender>
        <Pages.PageDialectLearnPhrasesByPhrasebook />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  })
}

// KIDS: Phrasebook, eg: /kids/.../learn/phrases/book/[uid]
const addBrowsePhraseBookKids = (route) => {
  return Object.assign({}, route, {
    path: [...DIALECT_PATH_ONLY_KIDS, 'learn', 'phrases', 'book', new paramMatch('phraseBook', ANYTHING_BUT_SLASH)],
    title: `${intl.translate({
      key: 'views.pages.explore.dialect.learn.phrases.page_title_phrase_book',
      default: 'Browsing by Phrase Book',
      case: 'words',
    })} | ${intl.translate({
      key: 'views.pages.explore.dialect.learn.phrases.page_title',
      default: 'Phrases',
      case: 'words',
    })} | {$dialect_name}`,
    page: (
      <Suspender>
        <Pages.KidsPhrasesByPhrasebook />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  })
}

const addBrowseAlphabet = (route) => {
  return Object.assign({}, route, {
    path: route.path.concat(['alphabet', new paramMatch('letter', ANYTHING_BUT_SLASH)]),
    title: '{$letter}' + ` | ${selectn('title', route)}`,
  })
}

// eg: learn/phrases/alphabet/b
const addBrowsePhraseBookByAlphabet = (route) => {
  return Object.assign({}, route, {
    path: route.path.concat(['alphabet', new paramMatch('letter', ANYTHING_BUT_SLASH)]),
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.phrases.page_title_phrase_book',
        default: 'Browsing Phrase Book alphabetically',
        case: 'words',
      }) +
      ' | ' +
      selectn('title', route),
  })
}

const routes = [
  {
    siteTheme: SECTIONS,
    id: 'home',
    path: [],
    alias: ['home'],
    page: (
      <Suspender>
        <Pages.PageHome />
      </Suspender>
    ),
    title: intl.translate({ key: 'home', default: 'Home', case: 'first' }),
    breadcrumbs: false,
    frontpage: true,
  },
  {
    id: 'dynamic_content_page',
    path: ['content', new paramMatch('friendly_url', ANYTHING_BUT_SLASH)],
    page: (
      <Suspender>
        <Pages.PageContent area={SECTIONS} />
      </Suspender>
    ),
    title: '{$pageTitle} | ' + intl.translate({ key: 'pages', default: 'Pages', case: 'first' }),
    breadcrumbs: false,
  },
  {
    path: ['content-preview', new paramMatch('friendly_url', ANYTHING_BUT_SLASH)],
    page: (
      <Suspender>
        <Pages.PageContent area={WORKSPACES} />
      </Suspender>
    ),
    title: '{$pageTitle} | ' + intl.translate({ key: 'pages', default: 'Pages', case: 'first' }),
    breadcrumbs: false,
  },
  {
    path: ['debug', 'end-points'],
    page: (
      <Suspender>
        <Pages.PageDebugAPI />
      </Suspender>
    ),
    breadcrumbs: false,
  },
  {
    path: ['debug', 'typography'],
    page: (
      <Suspender>
        <Pages.PageDebugTypography />
      </Suspender>
    ),
    breadcrumbs: false,
  },
  {
    path: [new paramMatch('siteTheme', new RegExp('kids'))],
    frontpage: true,
    title: intl.translate({ key: 'kids_home', default: 'Kids Home', case: 'words' }),
    page: (
      <Suspender>
        <Pages.KidsHome />
      </Suspender>
    ),
  },
  {
    path: ['play'],
    title: intl.translate({ key: 'games', default: 'Games', case: 'first' }),
    page: (
      <Suspender>
        <Pages.PagePlay />
      </Suspender>
    ),
  },
  {
    siteTheme: WORKSPACES,
    id: 'tasks',
    path: ['tasks'],
    title: intl.translate({ key: 'tasks', default: 'Tasks', case: 'first' }),
    page: (
      <Suspender>
        <Pages.PageTasks />
      </Suspender>
    ),
    disableWorkspaceSectionNav: true,
    breadcrumbs: false,
  },
  {
    siteTheme: WORKSPACES,
    path: ['tasks', 'users', new paramMatch('dialect', ANYTHING_BUT_SLASH)],
    title: intl.translate({ key: 'tasks', default: 'Tasks', case: 'first' }),
    page: (
      <Suspender>
        <Pages.PageUserTasks type="users" />
      </Suspender>
    ),
    breadcrumbs: false,
  },
  {
    path: ['register'],
    title: intl.translate({ key: 'register', default: 'Register', case: 'first' }),
    page: (
      <Suspender>
        <Pages.PageUsersRegister />
      </Suspender>
    ),
  },
  {
    path: ['forgotpassword'],
    title: intl.translate({ key: 'forgot_password', default: 'Forgot Password', case: 'words' }),
    breadcrumbs: false,
    page: (
      <Suspender>
        <Pages.PageUsersForgotPassword />
      </Suspender>
    ),
  },
  {
    path: [KIDS_OR_DEFAULT],
    redirects: [
      {
        condition: () => {
          return true
        },
        target: () => {
          return '/explore/FV/sections/Data/'
        },
      },
    ],
  },
  {
    path: [new paramMatch('area', WORKSPACE_OR_SECTION), new paramMatch('dialectFriendlyName', ANYTHING_BUT_SLASH)],
    title: intl.translate({
      key: 'dialect_short_url',
      default: 'Dialect Short Url',
      case: 'words',
    }),
    page: (
      <Suspender>
        <ServiceShortURL />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      't',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      new paramMatch('dialectFriendlyName', ANYTHING_BUT_SLASH),
      new paramMatch('appendPath', new RegExp('(.*)')),
    ],
    title: intl.translate({
      key: 'dialect_short_url',
      default: 'Dialect Short Url',
      case: 'words',
    }),
    page: (
      <Suspender>
        <ServiceShortURL />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    id: 'page_explore_dialects',
    path: [KIDS_OR_DEFAULT, 'FV', new paramMatch('area', WORKSPACE_OR_SECTION), 'Data'],
    title: intl.translate({
      key: 'x_dialects',
      default: '{$siteTheme} Dialects',
      params: ['{$siteTheme}'],
    }),
    page: (
      <Suspender>
        <Pages.PageExploreDialects />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  // SEARCH
  // ------------------------------------
  SEARCH,
  addPagination(SEARCH),
  SEARCH_DIALECT,
  addPagination(SEARCH_DIALECT),
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'register',
    ],
    title:
      '{$dialect_name} ' +
      intl.translate({
        key: 'registration',
        default: 'Registration',
        case: 'words',
      }),
    page: (
      <Suspender>
        <Pages.PageUsersRegister />
      </Suspender>
    ),
    disableWorkspaceSectionNav: true,
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      new paramMatch('language_family', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$language_family_name} ' +
      intl.translate({
        key: 'explore',
        default: 'Explore',
        case: 'words',
      }),
    page: (
      <Suspender>
        <Pages.PageExploreFamily />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    breadcrumbs: false,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
    ],
    title:
      '{$language_name} ' +
      intl.translate({
        key: 'explore',
        default: 'Explore',
        case: 'words',
      }),
    page: (
      <Suspender>
        <Pages.PageExploreLanguage />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    breadcrumbs: false,
  },
  {
    id: 'page_explore_dialect',
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
    ],
    title:
      '{$dialect_name} ' +
      intl.translate({
        key: 'home',
        default: 'Home',
        case: 'first',
      }) +
      ' | {$siteTheme}',
    page: (
      <Suspender>
        <Pages.PageExploreDialect />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    warnings: ['multiple_dialects'],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'edit',
    ],
    title: intl.translate({ key: 'edit', default: 'Edit', case: 'words' }) + ' {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageExploreDialectEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
    ],
    title:
      intl.translate({
        key: 'learn',
        default: 'Learn',
        case: 'words',
      }) + ' {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectLearn />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'media',
    ],
    title:
      intl.translate({
        key: 'browse_media',
        default: 'Browse Media',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectMedia />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'media',
      new paramMatch('media', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$media} | ' +
      intl.translate({
        key: 'media',
        default: 'Media',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewMedia />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'media',
      new paramMatch('media', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'edit',
        default: 'Edit',
        case: 'words',
      }) +
      ' {$media} | ' +
      intl.translate({
        key: 'media',
        default: 'Media',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectEditMedia />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'alphabet',
    ],
    title:
      intl.translate({
        key: 'alphabet',
        default: 'Alphabet',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewAlphabet />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'alphabet',
      'print',
    ],
    title:
      intl.translate({
        key: 'print_alphabet',
        default: 'Print Alphabet',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewAlphabet print />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'alphabet',
      new paramMatch('character', ANYTHING_BUT_SLASH),
    ],
    title:
      intl.translate({
        key: 'character',
        default: 'Character',
        case: 'words',
      }) +
      ' - {$character} | ' +
      intl.translate({
        key: 'alphabet',
        default: 'Alphabet',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewCharacter />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'alphabet',
      new paramMatch('character', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'edit',
        default: 'Edit',
        case: 'words',
      }) +
      ' {$character} ' +
      intl.translate({
        key: 'character',
        default: 'Character',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'print_alphabet',
        default: 'Print Alphabet',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectAlphabetCharacterEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
    ],
    title:
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectPlay />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'jigsaw',
    ],
    title:
      intl.translate({
        key: 'jigsaw',
        default: 'Jigsaw',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageJigsawGame />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'wordsearch',
    ],
    title:
      intl.translate({
        key: 'word_search',
        default: 'Word Search',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageWordSearch />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'colouringbook',
    ],
    title:
      intl.translate({
        key: 'coloring_book',
        default: 'Coloring Book',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageColouringBook />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'concentration',
    ],
    title:
      intl.translate({
        key: 'memory_game',
        default: 'Memory Game',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageConcentration />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'picturethis',
    ],
    title:
      intl.translate({
        key: 'picture_this',
        default: 'Picture This',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PagePictureThis />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'parachute',
    ],
    title:
      intl.translate({
        key: 'parachute',
        default: 'Parachute',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageHangman />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'wordscramble',
    ],
    title:
      intl.translate({
        key: 'word_scramble',
        default: 'Word Scramble',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageWordscramble />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'play',
      'quiz',
    ],
    title:
      intl.translate({
        key: 'quiz',
        default: 'Quiz',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'games',
        default: 'Games',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageQuiz />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'gallery',
    ],
    title:
      intl.translate({
        key: 'galleries',
        default: 'Galleries',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectGalleries />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'gallery',
      'create',
    ],
    title:
      intl.translate({
        key: 'create_gallery',
        default: 'Create Gallery',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'galleries',
        default: 'Galleries',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectGalleryCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'gallery',
      new paramMatch('galleryName', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$galleryName} | ' +
      intl.translate({
        key: 'galleries',
        default: 'Galleries',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectGalleryView />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'gallery',
      new paramMatch('gallery', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'edit',
        default: 'Edit',
        case: 'words',
      }) +
      ' {$galleryName} | ' +
      intl.translate({
        key: 'galleries',
        default: 'Galleries',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectGalleryEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [...DIALECT_PATH_KIDS_OR_DEFAULT, 'reports'],
    title:
      intl.translate({
        key: 'reports',
        default: 'Reports',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectReports />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  REPORT_VIEW,
  addPagination(REPORT_VIEW),
  DIALECT_LEARN_WORDS,
  addPagination(DIALECT_LEARN_WORDS),
  {
    path: [
      DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'words',
      'categories',
    ],
    title:
      intl.translate({
        key: 'categories',
        default: 'Categories',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'words',
        default: 'Words',
        case: 'words',
      }) +
      ' | {$dialect_name} | {$siteTheme}',
    page: (
      <Suspender>
        <Pages.PageDialectLearnWordsCategories />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  addBrowseAlphabet(DIALECT_LEARN_WORDS),
  addPagination(addBrowseAlphabet(DIALECT_LEARN_WORDS)),
  addCategory(DIALECT_LEARN_WORDS_ONLY_DEFAULT),
  addPagination(addCategory(DIALECT_LEARN_WORDS_ONLY_DEFAULT)),
  // WORDS: KIDS VIEW
  {
    path: [
      KIDS,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'words',
      'categories',
    ],
    title:
      intl.translate({
        key: 'categories',
        default: 'Categories',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'words',
        default: 'Words',
        case: 'words',
      }) +
      ' | {$dialect_name} | {$siteTheme}',
    page: (
      <Suspender>
        <Pages.WordsCategoriesGrid.Container />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  addCategoryKids(DIALECT_LEARN_WORDS_ONLY_KIDS),
  addPagination(addCategoryKids(DIALECT_LEARN_WORDS_ONLY_KIDS)),
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'words',
      'create',
    ],
    title:
      intl.translate({
        key: 'create',
        default: 'Create',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'words',
        default: 'Words',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectWordsCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'create',
      'audio',
    ],
    title: 'Create Audio, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CreateAudio />
      </Suspender>
    ),
    extractPaths: true,
  },
  // RECORDER
  // --------------------------------------------------
  // Recorder > Browse
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'recorders',
    ],
    title: 'Browse Recorders, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.RecorderBrowse />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Recorder > Browse (pagination)
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'recorders',
      ...PAGINATION_PATH,
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2)
      return _pathArray
    },
    title: 'Browse Recorders, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.RecorderBrowse hasPagination />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Recorder > Detail
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'recorder',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'recorders', 'detail')
      return _pathArray
    },
    title: 'Recorder Detail, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.RecorderDetail />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Recorder > Create
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'create',
      'recorder',
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'recorders', 'create')
      return _pathArray
    },
    title: 'Create Recorder, {$dialect_name}',

    page: (
      <Suspender>
        <Pages.RecorderCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Recorder > Edit
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'edit',
      'recorder',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 3, 3, 'recorders', 'edit')
      return _pathArray
    },
    title: 'Edit Recorder, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.RecorderEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  // CONTRIBUTOR
  // --------------------------------------------------
  // Contributor > Browse
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'contributors',
    ],
    title: 'Browse Contributors, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.ContributorBrowse />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Contributor > Browse (pagination)
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'contributors',
      ...PAGINATION_PATH,
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2)
      return _pathArray
    },
    title: 'Browse Contributors, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.ContributorBrowse hasPagination />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Contributor > Detail
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'contributor',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'contributors', 'detail')
      return _pathArray
    },
    title: 'Contributor Detail, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.ContributorDetail />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Contributor > Create
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'create',
      'contributor',
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'contributors', 'create')
      return _pathArray
    },
    title: 'Create Contributor, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.ContributorCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Contributor > Edit
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'edit',
      'contributor',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 3, 3, 'contributors', 'edit')
      return _pathArray
    },
    title: 'Edit Contributor, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.ContributorEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  // CATEGORY
  // --------------------------------------------------
  // Category > Browse
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'categories',
    ],
    title: 'Browse Categories, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CategoryBrowse />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Category > Browse (pagination)
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'categories',
      ...PAGINATION_PATH,
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2)
      return _pathArray
    },
    title: 'Browse Categories, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CategoryBrowse hasPagination />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Category > Detail
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'category',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'categories', 'detail')
      return _pathArray
    },
    title: 'Category Detail, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CategoryDetail />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Category > Create
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'create',
      'category',
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'categories', 'create')
      return _pathArray
    },
    title: 'Create Category, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CategoryCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Category > Edit
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'edit',
      'category',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 3, 3, 'categories', 'edit')
      return _pathArray
    },
    title: 'Edit Category, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.CategoryEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  // PHRASEBOOK
  // --------------------------------------------------
  // Phrasebook > Browse
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'phrasebooks',
    ],
    title: 'Browse Phrasebooks, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PhrasebookBrowse />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Phrasebook > Browse (pagination)
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'phrasebooks',
      ...PAGINATION_PATH,
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2)
      return _pathArray
    },
    title: 'Browse Phrasebooks, {$dialect_name}',

    page: (
      <Suspender>
        <Pages.PhrasebookBrowse hasPagination />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Phrasebook > Detail
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'phrasebook',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'phrasebooks', 'detail')
      return _pathArray
    },
    title: 'Phrasebook Detail, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PhrasebookDetail />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Phrasebook > Create
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'create',
      'phrasebook',
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 2, 2, 'phrasebooks', 'create')
      return _pathArray
    },
    title: 'Create Phrasebook, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PhrasebookCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  // Phrasebook > Create V1
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'phrasebooks',
      'create',
    ],
    title:
      intl.translate({
        key: 'create',
        default: 'Create',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'phrase_book',
        default: 'Phrase Book',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectPhraseBooksCreate />
      </Suspender>
    ),
  },
  // Phrasebook > Edit
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'edit',
      'phrasebook',
      new paramMatch('itemId', ANYTHING_BUT_SLASH),
    ],
    breadcrumbPathOverride: (pathArray) => {
      const _pathArray = [...pathArray]
      _pathArray.splice(_pathArray.length - 3, 3, 'phrasebooks', 'edit')
      return _pathArray
    },
    title: 'Edit Phrasebook, {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PhrasebookEdit />
      </Suspender>
    ),
    extractPaths: true,
  },

  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'words',
      new paramMatch('word', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$word} | ' +
      intl.translate({
        key: 'words',
        default: 'Words',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewWord />
      </Suspender>
    ),
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'words',
      new paramMatch('word', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'edit_x_word',
        default: 'Edit {$word} Word',
        params: ['{$word}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'words',
        default: 'Words',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectWordEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  DIALECT_LEARN_PHRASES,
  addPagination(DIALECT_LEARN_PHRASES),
  // EXPLORE: Phrasebook, eg: /explore/.../learn/phrases/book/[uid]
  addBrowsePhraseBook(),
  // EXPLORE: Phrasebook w/Pagination, eg: /explore/.../learn/phrases/book/[uid]/10/1
  addPagination(addBrowsePhraseBook()),
  // Phrase by Alphabet, eg: /[kids|explore]/.../learn/phrases/alphabet/b
  addBrowsePhraseBookByAlphabet(DIALECT_LEARN_PHRASES),
  // Phrase by Alphabet w/Pagination, eg: /[kids|explore]/.../learn/phrases/alphabet/b/10/1
  addPagination(addBrowsePhraseBookByAlphabet(DIALECT_LEARN_PHRASES)),
  // KIDS: Phrasebooks, eg: /kids/.../learn/phrases
  {
    path: [
      KIDS,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'phrasebooks',
    ],
    title:
      intl.translate({
        key: 'phrase_categories',
        default: 'Phrase Categories',
        case: 'words',
      }) + ' | {$dialect_name} | {$siteTheme}',
    page: (
      <Suspender>
        <Pages.PhraseBooksGrid.Container />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  // KIDS: Phrasebook, eg: /kids/.../learn/phrases/book/[uid]
  addBrowsePhraseBookKids(),
  // KIDS: Phrasebook w/Pagination, eg: /kids/.../learn/phrases/book/[uid]/10/1
  addPagination(addBrowsePhraseBookKids()),
  // Phrases: Create
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'phrases',
      'create',
    ],
    title:
      intl.translate({
        key: 'create',
        default: 'Create',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'phrases',
        default: 'Phrases',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectPhrasesCreate />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'phrases',
      new paramMatch('phrase', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$phrase} | ' +
      intl.translate({
        key: 'phrases',
        default: 'Phrases',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewPhrase />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'phrases',
      new paramMatch('phrase', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.phrases.edit_x_phrase',
        default: 'Edit {$phrase} Phrase',
        params: ['{$phrase}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'phrases',
        default: 'Phrases',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectPhraseEdit />
      </Suspender>
    ),
    extractPaths: true,
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'stories',
    ],
    title:
      intl.translate({
        key: 'stories',
        default: 'Stories',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectLearnStoriesAndSongs
          typeFilter="story"
          typePlural={intl.translate({
            key: 'stories',
            default: 'Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
    ],
    title:
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectLearnStoriesAndSongs
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs-stories',
    ],
    title:
      intl.translate({
        key: 'songs_and_stories',
        default: 'Songs and Stories',
        case: 'words',
      }) + ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectLearnStoriesAndSongs
          typePlural={intl.translate({
            key: 'songs_and_stories',
            default: 'Songs and Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'stories',
      'create',
    ],
    title:
      intl.translate({
        key: 'create',
        default: 'Create',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'stories',
        default: 'Stories',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectStoriesAndSongsCreate
          typeFilter="story"
          typePlural={intl.translate({
            key: 'stories',
            default: 'Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
      'create',
    ],
    title:
      intl.translate({
        key: 'create',
        default: 'Create',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectStoriesAndSongsCreate
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
      new paramMatch('bookName', ANYTHING_BUT_SLASH),
    ],
    title:
      '{$bookName} | ' +
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewBook
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
      new paramMatch('bookName', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.edit_x_book',
        default: 'Edit {$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectBookEdit
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
      new paramMatch('parentBookName', ANYTHING_BUT_SLASH),
      'create',
    ],
    title:
      intl.translate({
        key: 'create_entry',
        default: 'Create Entry',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.x_book',
        default: '{$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectStoriesAndSongsBookEntryCreate
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    // TODO: DELETE?
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'songs',
      new paramMatch('parentBookName', ANYTHING_BUT_SLASH),
      new paramMatch('bookName', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'edit_entry',
        default: 'Edit Entry',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.x_book',
        default: '{$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'songs',
        default: 'Songs',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectBookEntryEdit
          typeFilter="song"
          typePlural={intl.translate({
            key: 'songs',
            default: 'Songs',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'stories',
      new paramMatch('bookName', ANYTHING_BUT_SLASH),
    ],
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.x_book',
        default: '{$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'stories',
        default: 'Stories',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectViewBook
          typeFilter="story"
          typePlural={intl.translate({
            key: 'stories',
            default: 'Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      new paramMatch('area', WORKSPACE_OR_SECTION),
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'stories',
      new paramMatch('bookName', ANYTHING_BUT_SLASH),
      'edit',
    ],
    title:
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.edit_x_book',
        default: 'Edit {$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'stories',
        default: 'Stories',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectBookEdit
          typeFilter="story"
          typePlural={intl.translate({
            key: 'stories',
            default: 'Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  {
    path: [
      KIDS_OR_DEFAULT,
      'FV',
      WORKSPACES,
      'Data',
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      ANYTHING_BUT_SLASH,
      'learn',
      'stories',
      new paramMatch('parentBookName', ANYTHING_BUT_SLASH),
      'create',
    ],
    title:
      intl.translate({
        key: 'create_entry',
        default: 'Create Entry',
        case: 'words',
      }) +
      ' | ' +
      intl.translate({
        key: 'views.pages.explore.dialect.learn.songs_stories.x_book',
        default: '{$bookName} Book',
        params: ['{$bookName}'],
      }) +
      ' | ' +
      intl.translate({
        key: 'stories',
        default: 'Stories',
        case: 'words',
      }) +
      ' | {$dialect_name}',
    page: (
      <Suspender>
        <Pages.PageDialectStoriesAndSongsBookEntryCreate
          typeFilter="story"
          typePlural={intl.translate({
            key: 'stories',
            default: 'Stories',
            case: 'words',
          })}
        />
      </Suspender>
    ),
    extractPaths: true,
    redirects: [WORKSPACE_TO_SECTION_REDIRECT],
  },
  DIALECT_IMMERSION_WORDS,
  addPagination(DIALECT_IMMERSION_WORDS),
  addImmersionCategory(DIALECT_IMMERSION_WORDS),
  addPagination(addImmersionCategory(DIALECT_IMMERSION_WORDS)),
  // DASHBOARDS
  // ==========================================================
  {
    siteTheme: WORKSPACES,
    id: 'dashboard',
    path: ['dashboard'],
    title: intl.translate({ key: 'dashboard', default: 'Dashboard', case: 'first' }),
    page: (
      <Suspender>
        <Pages.Dashboard.Container />
      </Suspender>
    ),
    breadcrumbs: false,
    disableWorkspaceSectionNav: true,
  },
  {
    siteTheme: WORKSPACES,
    id: 'dashboard',
    path: ['dashboard', 'tasks'],
    title: intl.translate({ key: 'dashboard', default: 'Dashboard', case: 'first' }),
    page: (
      <Suspender>
        <Pages.DashboardDetailTasks.Container />
      </Suspender>
    ),
    breadcrumbs: false,
  },
  // Mentor-Apprentice Photo Project
  // ==========================================================
  {
    path: ['photo-project'],
    title: 'Mentor-Apprentice Photo Project',
    page: <Pages.PageMAPPhotoProject />,
    // page: (
    //   <Suspender>
    //     <Pages.PageMAPPhotoProject />
    //   </Suspender>
    // ),
    breadcrumbs: false,
  },
]

export default routes
