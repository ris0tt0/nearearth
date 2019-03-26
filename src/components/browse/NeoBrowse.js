import React from 'react';
import ReactPaginate from 'react-paginate'
import {string,number,func,bool,arrayOf,shape} from 'prop-types';
import Logger from 'js-logger';

function getPagination(starting,total,onLinkApi)
{
	return (
					<ReactPaginate
						initialPage={starting}
						pageCount={total}
						pageRangeDisplayed={9}
						marginPagesDisplayed={2}
						previousLabel={'PREVIOUS'}
						nextLabel={'NEXT'}
						disableInitialCallback={true}
						// breakLabel={'...'}
						breakClassName={'pagination_break'}
						onPageChange={e => onLinkApi(e.selected)}
						// The classname of the pagination container.
						containerClassName={'pagination_container'}
						// The classname for the active page.
						activeClassName={'pagination_active'}
						// The classname on tag li of each page element.
						pageClassName={'pagination_page'}
						// The classname on tag li of the next button.
						nextClassName={'pagination_next'}
						// The classname for disabled previous and next buttons.
						disabledClassName={'pagination_disabled'}
						// The classname on tag a of the next button.
						nextLinkClassName={'pagination_nextlink'}
						// The classname on tag a of the previous button.
						previousLinkClassName={'pagination_previouslink'}
						//  The classname on tag li of the previous button.
						previousClassName={'pagination_previous'}
						// The classname on the active tag a.
						activeLinkClassName={'pagination_activelink'}
						// The classname on tag a of each page element.
						pageLinkClassName={'pagination_pagelink'}
					/>
	);
}

function getapiLinkForPage(url, pageNumber)
{
	return url.replace(/page=\d*/,`page=${pageNumber}`);
}

function NeoBrowse({neos,links,page,onSelectId,isFetching,onLinkApi}) {

	if(!links.self) return <div></div>;
	if( isFetching) return <div>Loading browse</div>
	
	// Logger.info(getapiLinkForPage(links.self,page.number));
	
	const neotablerows = neos.map((item,index) => (
		<tr key={index}>
			<td>{item.absolute_magnitude_h}</td>
			<td>{item.designation}</td>
			<td>{item.is_potentially_hazardous_asteroid ? <b>true</b> : 'false'}</td>
			<td>{item.is_sentry_object ? <b>true</b> : 'false'}</td>
			<td>{item.name}</td>
			<td><a href={item.nasa_jpl_url} target='_blank' rel='noopener noreferrer'>{item.nasa_jpl_url}</a></td>
			<td><button onClick={() => onSelectId(item.neo_reference_id)}>{item.neo_reference_id}</button></td>
		</tr>
	));

	const neotable = (
		<table>
			<caption><b>NEAR EARTH OBJECTS</b></caption>
			<thead>
				<tr>
					<th>Absolute magnitude h</th>
					<th>Designation</th>
					<th>is potentially hazardous asteroid</th>
					<th>Is sentry object</th>
					<th>Name</th>
					<th>Nasa jpl url</th>
					<th>NEO reference id</th>
				</tr>
			</thead>
			<tbody>
				{neotablerows}
			</tbody>
		</table>);

	const onPagination = pageNumber => onLinkApi(getapiLinkForPage(links.self,pageNumber));
	
	return (
		<div className='NeoBrowse'>
			<h1>Near Earth Object Browse</h1>
			{getPagination(page.number,page.total_pages,onPagination)}
			<div className='NeoBrowse__tablecontainer'>{neotable}</div>
			{getPagination(page.number,page.total_pages,onPagination)}
		</div>
	);
}

NeoBrowse.propTypes = {
	onSelectId:func.isRequired,
	isFetching:bool.isRequired,
	neos:arrayOf(shape({
		absolute_magnitude_h:number.isRequired,
		designation:string.isRequired,
		is_potentially_hazardous_asteroid:bool.isRequired,
		is_sentry_object:bool.isRequired,
		name:string.isRequired,
		nasa_jpl_url:string.isRequired,
		neo_reference_id:string.isRequired,
	})).isRequired,
	page:shape({
		number:number.isRequired,
		size:number.isRequired,
		total_elements:number.isRequired,
		total_pages:number.isRequired,
	}).isRequired,
	links:shape({
		self:string.isRequired,
		next:string,
		prev:string,
	}).isRequired,
}

export {NeoBrowse}

