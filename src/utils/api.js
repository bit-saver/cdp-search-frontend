import axios from 'axios';
import bodybuilder from 'bodybuilder';

const SEARCH = `${process.env.REACT_APP_PUBLIC_API}/v1/search`;
const OPENNET = `${process.env.REACT_APP_PUBLIC_API}/v1/task/opennet`;

export const queryRequest = body => axios.post( SEARCH, body ).then( response => response.data );

/**
 * Get languages that have associated content
 */
export const languageAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'unit.language.locale.keyword', { size: 50 }, 'unitLocale' )
        .agg( 'terms', 'language.locale.keyword', { size: 50 }, 'locale' )
        .build()
    } )
    .then( response => response.data );

/**
 * Get all languages in languages index
 */
export const languagesRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 200 )
        .query( 'query_string', 'query', '_type: language' )
        .build()
    } )
    .then( response => response.data );

/**
 * Get categories that have associated content
 */
export const categoryAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'unit.categories.id.keyword', {}, 'unitId' )
        .agg( 'terms', 'categories.id.keyword', {}, 'id' )
        .build()
    } )
    .then( response => response.data );

/**
 * Get primary categories
 */
export const categoryPrimaryRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 100 )
        .query( 'query_string', 'query', '_type: term AND primary: true' )
        .build()
    } )
    .then( response => response.data );

/**
 * Get the categories that match supplied ids,used to fetch category display name
 * TODO: search only taxonomy index
 *
 * @param {array} ids taxonomy ids
 */
export const categoryValueNameRequest = ( ids = [] ) =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 200 )
        .orFilter( 'terms', '_id', ids.map( id => id.key ) )
        .build()
    } )
    .then( response => response.data );

/**
 * Get all sources that have associated content
 */
export const sourceAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'owner.keyword', {}, 'source' )
        .build()
    } )
    .then( response => response.data );

/**
 * Get all post types that have associated content
 */
export const postTypeAggRequest = () =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 0 )
        .agg( 'terms', 'type.keyword', {}, 'postType' )
        .build()
    } )
    .then( response => response.data );

/**
 *
 * @param {*} currentType
 * @param {*} currentLang
 */
export const typeRecentsRequest = ( currentType, currentLang ) =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 3 )
        .query( 'match', 'type', currentType )
        .query( 'query_string', 'query', `(language.locale: ${currentLang} OR unit.language.locale: ${currentLang})` )
        .sort( 'published', 'desc' )
        .build()
    } )
    .then( response => response.data );

/**
 *
 * @param {*} site
 * @param {*} postId
 */
export const getItemRequest = ( site, postId ) =>
  axios
    .post( SEARCH, {
      body: bodybuilder()
        .size( 1 )
        .query( 'query_string', 'query', `(site: ${site} AND post_id: ${postId})` )
        .build()
    } )
    .then( response => response.data );

export const getOpenNetRequest = () =>
  axios.get( OPENNET ).then( response => response.data );
