import React, { Component } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import EvaluationTable from "../components/evaluation-table"
import EvaluationCell from "../components/evaluation-cell"
import { itemListFeatures } from "../utils/sidebar/item-list"
import Container from "../components/container"
import {
  colors,
  space,
  breakpoints,
  fontSizes,
  letterSpacings,
  fonts,
} from "../utils/presets"

const legendBorderColor = colors.ui.light

const LegendTable = () => {
  const legendBallStyle = {
    float: `none`,
    marginLeft: 0,
    marginRight: 0,
    display: `inline-block`,
  }

  const legendBallCellStyle = {
    display: `table-cell`,
    verticalAlign: `middle`,
    textAlign: `center`,
    padding: 10,
    borderLeft: `1px solid ${legendBorderColor}`,
    borderBottom: `1px solid ${legendBorderColor}`,
  }

  const legendExplanationCellStyle = {
    display: `table-cell`,
    verticalAlign: `middle`,
    textAlign: `center`,
    padding: 10,
    borderLeft: `1px solid ${legendBorderColor}`,
    borderBottom: `1px solid ${legendBorderColor}`,
    [breakpoints.sm]: {
      borderBottom: 0,
    },
  }

  const balls = [
    <div css={legendBallCellStyle} key={`${legendBallCellStyle}-1`}>
      <h4 style={{ margin: 0 }}>Icon</h4>
    </div>,
    <div css={legendBallCellStyle} key={`${legendBallCellStyle}-2`}>
      <EvaluationCell num="3" style={legendBallStyle} />
    </div>,
    <div css={legendBallCellStyle} key={`${legendBallCellStyle}-3`}>
      <EvaluationCell num="2" style={legendBallStyle} />
    </div>,
    <div css={legendBallCellStyle} key={`${legendBallCellStyle}-4`}>
      <EvaluationCell num="1" style={legendBallStyle} />
    </div>,
    <div css={legendBallCellStyle} key={`${legendBallCellStyle}-5`}>
      <EvaluationCell num="0" style={legendBallStyle} />
    </div>,
  ]

  const legendText = [
    <div css={legendExplanationCellStyle} key={`legendExplanationCell-1`}>
      <h5 style={{ margin: 0 }}>Feature Availability</h5>
    </div>,
    <div css={legendExplanationCellStyle} key={`legendExplanationCell-2`}>
      Out of the box
    </div>,
    <div css={legendExplanationCellStyle} key={`legendExplanationCell-3`}>
      Plugins available
    </div>,
    <div css={legendExplanationCellStyle} key={`legendExplanationCell-4`}>
      Needs customization
    </div>,
    <div css={legendExplanationCellStyle} key={`legendExplanationCell-5`}>
      Not possible
    </div>,
  ]

  return (
    <div>
      <Helmet>
        <title>Features</title>
      </Helmet>
      <div
        css={{
          border: `1px solid ${legendBorderColor}`,
          borderLeft: 0,
          fontFamily: fonts.header,
          display: `none`,
          [breakpoints.sm]: {
            display: `table`,
          },
        }}
      >
        <div css={{ display: `table-row` }}>{balls}</div>
        <div css={{ display: `table-row` }}>{legendText}</div>
      </div>
      <div
        css={{
          display: `table`,
          border: `1px solid ${legendBorderColor}`,
          borderLeft: 0,
          fontFamily: fonts.header,
          [breakpoints.sm]: {
            display: `none`,
          },
        }}
      >
        {[0, 1, 2, 3, 4].map(i => (
          <div css={{ display: `table-row` }} key={i}>
            {balls[i]}
            {legendText[i]}
          </div>
        ))}
      </div>
    </div>
  )
}

const FeaturesHeader = () => (
  <section>
    <h1 id="introduction" style={{ marginTop: 0 }}>
      Features
    </h1>
    <p>
      There are many ways to build a website. If you’re considering Gatsby, you
      may also be looking at some alternatives:
    </p>
    <ul>
      <li>
        <strong>JAMstack frameworks</strong> such as
        {` `}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>,
        {` `}
        <a href="https://vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">VuePress</a>, and
        {` `}
        <a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll</a>
        {` `}
        let you put text or markdown in a specific directory such as
        <code>pages/</code> in a version-controlled codebase. They then build a
        specific kind of site, usually a blog, as HTML files from the content
        you’ve added. These files can be cached and served from a CDN.
      </li>
      <li>
        <strong>Traditional content management systems</strong> (CMSs) like
        {` `}
        <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress</a> and
        {` `}
        <a href="https://drupal.org/" target="_blank" rel="noopener noreferrer">Drupal</a>
        {` `}
        give you an online text editor to create content. You customize the look
        and feel by choosing themes and plugins or by writing custom PHP or
        JavaScript code. Content is saved in a database, which is retrieved and
        sent to users when they visit the website. Depending on your
        requirements you can self-host your website or use an official hosting
        provider.
      </li>
    </ul>
    <p>
      The chart below details Gatsby’s capabilities in comparison with a
      representative from each category. Click on any row to see a more detailed
      explanation on that feature and our rating for each system.
    </p>
    <h6
      id="legend"
      css={{
        fontWeight: `normal`,
        textTransform: `uppercase`,
        letterSpacing: letterSpacings.tracked,
      }}
    >
      Legend
    </h6>
    <LegendTable />
  </section>
)

const getFeaturesData = function(data) {
  const sections = (data || [])
    .map((row, i) => (row.node.Category ? i : -1))
    .filter(rowNum => rowNum !== -1)
    .map((rowNum, i, arr) => {
      if (i < arr.length - 1) {
        return [rowNum, arr[i + 1]]
      }

      return [rowNum, data.length]
    })
    .map(bounds => data.slice(bounds[0], bounds[1]))

  const sectionHeaders = (data || [])
    .filter(row => row.node.Category)
    .map(row => row.node.Category)

  return {
    sectionHeaders,
    sections,
  }
}

const FeaturesFooter = () => (
  <p css={{ fontSize: fontSizes[1], marginTop: space[8] }}>
    Want to help keep this information complete, accurate, and up-to-date?
    Please comment
    {` `}
    <a
      href="https://github.com/gatsbyjs/gatsby/issues/2444"
      target="_blank"
      rel="noopener noreferrer"
    >
      here.
    </a>
  </p>
)

class FeaturesPage extends Component {
  render() {
    const { sections, sectionHeaders } = getFeaturesData(
      this.props.data.allGatsbySpecsCsv.edges
    )

    return (
      <Layout
        location={this.props.location}
        itemList={itemListFeatures}
        enableScrollSync={true}
      >
        <Container>
          <main id={`reach-skip-nav`}>
            <FeaturesHeader />
            <EvaluationTable
              sections={sections}
              sectionHeaders={sectionHeaders}
            />
            <FeaturesFooter />
          </main>
        </Container>
      </Layout>
    )
  }
}

export default FeaturesPage

export const pageQuery = graphql`
  query {
    allGatsbySpecsCsv {
      edges {
        node {
          Category
          Subcategory
          Feature
          Gatsby
          WordPress
          Squarespace
          Jekyll
          Description
        }
      }
    }
  }
`
