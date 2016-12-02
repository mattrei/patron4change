/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import {ListItem} from 'react-toolbox/lib/list';
import * as shapes from './shapes';

import styles from '../../client/css/modules/search-result-item.scss';

class SearchResultItem extends React.Component {

  static propTypes = {
  	changemaker: shapes.changemaker.isRequired,
    match: PropTypes.shape({
      relevance: PropTypes.number.isRequired,
      section: PropTypes.object
    })
  }

  render() {
    let cm = this.props.changemaker;
    let { section } = this.props.match;
    let name = `${cm.firstName} ${cm.lastName}`;

    const content = <div>
      <span className={styles.mainText + ' main-text'}>{name}</span>
      <span className={styles.subText + ' sub-text'}
        dangerouslySetInnerHTML={{ __html: section ? section.value : cm.mission }} />
    </div>;

    return <ListItem
      avatar={cm.image}
      to={`/changemaker/${cm.id}`}
      itemContent={content}
      ripple
      selectable
      {...this.props}
    />;
  }
}

export default SearchResultItem;
