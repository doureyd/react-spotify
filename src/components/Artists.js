import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, setSearch } from '../actions';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = e => {
    this.props.onSetSearch(e.target.value);
  };
  componentWillMount() {
    if (!this.props.token) {
      const token = window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/);
      if (token) {
        this.props.onSetToken(token[1]);
      } else {
        window.location.replace(window.location.origin);
      }
    }
  }
  render() {
    return (
      <div className="artists">
        <div>
          <input
            type="search"
            placeholder="Search for an artists..."
            value={this.props.search}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.session.token,
  search: state.session.search,
  artists: state.data.artists,
});

const mapDispatchToProps = dispatch => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetSearch: search => dispatch(setSearch(search)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Artists);
