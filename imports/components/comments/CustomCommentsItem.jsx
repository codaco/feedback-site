import { Components, getRawComponent, replaceComponent }from 'meteor/vulcan:core';
import React from 'react';
import { FormattedMessage /*, intlShape */ } from 'meteor/vulcan:i18n';
import moment from 'moment';
import { Comments } from 'meteor/example-forum';


class CustomCommentsItem extends getRawComponent('CommentsItem') {
    constructor() {
        super();
        ['showEdit', 'editCancelCallback', 'editSuccessCallback', 'removeSuccessCallback'].forEach(methodName => {
            this[methodName] = this[methodName].bind(this)
        });
        this.state = {
            showEdit: false
        };
    }
    showEdit(event) {
        event.preventDefault();
        this.setState({showEdit: true});
    }

    editCancelCallback(event) {
        event.preventDefault();
        this.setState({showEdit: false});
    }

    editSuccessCallback() {
        this.setState({showEdit: false});
    }

    removeSuccessCallback({documentId}) {
        const deleteDocumentSuccess = this.context.intl.formatMessage({id: 'comments.delete_success'});
        this.props.flash(deleteDocumentSuccess, "success");
        // todo: handle events in async callback
        // this.context.events.track("comment deleted", {_id: documentId});
    }

    renderComment() {
        const htmlBody = {__html: this.props.comment.htmlBody};

        // const showReplyButton = !this.props.comment.isDeleted && !!this.props.currentUser;

        return (
            <div className="comments-item-text">
                <div dangerouslySetInnerHTML={htmlBody}></div>
            </div>
        )
    }

    renderEdit() {

        return (
            <Components.CommentsEditForm
                comment={this.props.comment}
                successCallback={this.editSuccessCallback}
                cancelCallback={this.editCancelCallback}
                removeSuccessCallback={this.removeSuccessCallback}
            />
        )
    }
    render() {
        const comment = this.props.comment;

        return (
            <div className="comments-item" id={comment._id}>
                <div className="comments-item-body">
                    <div className="comments-item-meta">
                        <Components.UsersName user={comment.user}/>
                        <div className="comments-item-date">{moment(new Date(comment.postedAt)).fromNow()}</div>
                        {Comments.options.mutations.edit.check(this.props.currentUser, this.props.comment) &&
                        <div>
                            <a className="comment-edit" onClick={this.showEdit}><FormattedMessage id="comments.edit"/></a>
                        </div>
                        }
                    </div>
                    {this.state.showEdit ? this.renderEdit() : this.renderComment()}
                </div>
            </div>
        )
    }
}

replaceComponent('CommentsItem', CustomCommentsItem);
