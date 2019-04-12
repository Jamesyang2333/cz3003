import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Detail from '../layout/detail';
import { connect } from 'react-redux';
import { getAll, getHaze, getDengue } from '../../actions/crisisAction';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='First Page'>
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label='Previous Page'>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Next Page'>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='Last Page'>
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const mapStateToProps = state => ({
  alls: state.crisis.alls,
  hazes: state.crisis.hazes,
  dengues: state.crisis.dengues
});

class IncidentTable extends React.Component {
  state = {
    rows: 0,
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  render() {
    // console.log('[object]');
    // console.log(this.state.rowsPerPage);
    const { type, classes } = this.props;
    if (type === 'all') {
      const { alls } = this.props;
      this.state.rows = alls;
    } else if (type === 'haze') {
      const { hazes } = this.props;
      this.state.rows = hazes;
    } else if (type === 'dengue') {
      const { dengues } = this.props;
      this.state.rows = dengues;
    }
    // const emptyRows =
    //   this.state.rowsPerPage -
    //   Math.min(
    //     this.state.rowsPerPage,
    //     this.state.rows.length - this.state.page * this.state.rowsPerPage
    //   );

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Incident id</TableCell>
              <TableCell align='left'>Incident type</TableCell>
              <TableCell align='left'>Incident location</TableCell>
              <TableCell align='left'>Incident time</TableCell>
              <TableCell align='left'>Incident status</TableCell>
              <TableCell align='center'>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows
              .slice(
                this.state.page * this.state.rowsPerPage,
                this.state.page * this.state.rowsPerPage +
                  this.state.rowsPerPage
              )
              .map(row => (
                <TableRow>
                  <TableCell align='left' component='th' scope='row'>
                    {row.record_id}
                  </TableCell>
                  <TableCell align='left' component='th' scope='row'>
                    {row.incident_type.toString().replace(/^./, function(str) {
                      return str.toUpperCase();
                    })}
                  </TableCell>
                  <TableCell align='left' component='th' scope='row'>
                    {row.incident_location
                      .toLowerCase()
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </TableCell>
                  <TableCell align='left' component='th' scope='row'>
                    {new Date(row.date).toString().slice(0, 25)}
                  </TableCell>
                  <TableCell align='left' component='th' scope='row'>
                    {row.incident_status
                      .toString()
                      .replace(/^./, function(str) {
                        return str.toUpperCase();
                      })}
                  </TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    <Detail event={row} />
                  </TableCell>
                </TableRow>
              ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={10} />
              </TableRow>
            )} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={10}
                count={this.state.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

IncidentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  getHaze: PropTypes.func.isRequired,
  getDengue: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getAll, getDengue, getHaze }
)(withStyles(styles)(IncidentTable));
