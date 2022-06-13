import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../Layouts/Spinner';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
	const { id } = useParams();
	useEffect(() => {
		getPost(id);
	}, [getPost, id]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back to posts
			</Link>
			<PostItem showActions={false} post={post} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
