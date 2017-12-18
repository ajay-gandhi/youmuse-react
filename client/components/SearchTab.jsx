import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "./store/Store";

class SearchItem extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number,
    searchResult: PropTypes.object,
    addToPlayList: PropTypes.func,
  };

  handleClick = () => {
    this.props.addToPlayList(this.props.index);
  }

  render = () => {
    const item = this.props.searchResult.snippet;
    return (
      <div onClick={ this.handleClick } style={ { border: "1px solid blue" } }>
        <img src={ item.thumbnails.default.url } />
        <h2>{ item.title }</h2>
        <h3>{ item.channelTitle }</h3>
      </div>
    );
  }
}

class SearchTab extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.string,
    searchResults: PropTypes.arrayOf(PropTypes.object),
    getSearchResults: PropTypes.func,
    addItemToPlayList: PropTypes.func,
  };

  componentWillMount = () => {
    if (this.props.searchQuery) {
      this.props.getSearchResults();
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.searchQuery !== this.props.searchQuery) {
      this.props.getSearchResults();
    }
  }

  render = () => {
    const searchResults = this.props.searchResults.map((result, index) => (
      <SearchItem
        key={ result.id.videoId }
        searchResult={ result }
        index={ index }
        addToPlayList={ this.props.addItemToPlayList }
      />
    ));

    return (
      <div className="searchResults">
        { searchResults }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
    searchResults: state.searchResults.results,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: () => dispatch(actions.getSearchResults()),
    addItemToPlayList: (index) => dispatch(actions.moveItemToPlaylist(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTab);