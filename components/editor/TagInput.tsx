import React, { useState } from "react";

const TagInput = ({ tagList, addTag, removeTag }: any) => {
  const [tag, setTag] = useState("");

  const handleChange = (e: any) => setTag(e.target.value);

  const handleAddTag = () => {
    if (!!tag) {
      addTag(tag);
      setTag("");
    }
  };

  const handleRemoveTag = (tag: any) => {
    removeTag(tag);
  };

  const handleTagInputKeyDown = (e: any) => {
    switch (e.keyCode) {
      case 13: // enter
      case 9: //tab
      case 188: // comma
        if (e.keyCode !== 9) {
          e.preventDefault();
        }
        handleAddTag();
        break;

      default:
        break;
    }
  };

  return (
    <>
      <fieldset className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Enter tags"
          value={tag}
          onChange={handleChange}
          onBlur={handleAddTag}
          onKeyDown={handleTagInputKeyDown}
        />

        <div className="tag-list">
          {tagList.map((tag: any, index: any) => (
            <span className="tag-default tag-pill" key={index}>
              <i
                className="ion-close-round"
                onClick={() => handleRemoveTag(tag)}
              />
              {tag}
            </span>
          ))}
        </div>
      </fieldset>
    </>
  );
};

export default TagInput;
