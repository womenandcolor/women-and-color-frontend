import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';

import { find } from 'lodash';

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

const renderSuggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.topic) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.topic}
      selected={isHighlighted}
      component="div"
      value={suggestion}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      <ListItemText primary={suggestion.topic} />
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ topic: PropTypes.string }).isRequired,
};

const getSuggestions = (inputValue, topics, selectedTopics) => {
  let count = 0;

  return topics.filter(suggestion => {
    const keep =
      (!inputValue ||
        (suggestion.topic &&
          suggestion.topic.toLowerCase().includes(inputValue.toLowerCase()))) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

class TopicSelector extends React.Component {
  state = {
    inputValue: '',
  };

  handleKeyDown = event => {
    const { inputValue } = this.state;
    const { selectedTopics, handleChange, createTopic, topics } = this.props;
    if (
      selectedTopics.length &&
      !inputValue.length &&
      keycode(event) === 'backspace'
    ) {
      const updatedTopics = selectedTopics.slice(0, selectedTopics.length - 1);
      handleChange(updatedTopics);
    }

    if (keycode(event) === 'enter' && inputValue.length > 1) {
      const topicList = topics.map(topic => topic.topic);
      if (topicList.includes(inputValue)) return; // prevent creating same topic name with different ids
      createTopic(inputValue);
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedTopics, handleChange } = this.props;

    if (!find(selectedTopics, ['topic', item.topic])) {
      selectedTopics = [...selectedTopics, item];
    }

    handleChange(selectedTopics);
    this.setState({ inputValue: '' });
  };

  handleDelete = item => () => {
    const selectedTopics = [...this.props.selectedTopics];
    selectedTopics.splice(selectedTopics.indexOf(item), 1);

    this.props.handleChange(selectedTopics);
  };

  render() {
    const { classes, selectedTopics, topics } = this.props;
    const { inputValue } = this.state;

    return (
      <Downshift
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedTopics}
        itemToString={i => (i == null ? '' : i.topic)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              disabled: (selectedTopics.length >= 10),
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedTopics.map(item => (
                  <Chip
                    key={item.topic}
                    tabIndex={-1}
                    label={item.topic}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Select topics',
                id: 'integration-downshift-multiple',
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, topics, selectedTopics).map(
                  (suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

TopicSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopicSelector);
