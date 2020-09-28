import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'

import utilStyles from '../../styles/utils.module.css'

import { getAllPostIds, getPostData } from '../../lib/posts'

const Post = ({postData}) => {
  return (
    <Layout>
      <Head>
        {postData.title}
      </Head>
			<article>
				<h1 className={utilStyles.headingX1}> {postData.title} </h1>

				<div className={utilStyles.lightText}>
					<Date dateString={postData.date}/>
				</div>

				<div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
			</article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}

export default Post

