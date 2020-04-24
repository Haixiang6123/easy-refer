import dayjs from 'dayjs'
import Mock from 'mockjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const dateRange = () => dayjs(Mock.Random.date()).toISOString()
const now = () => dayjs().toISOString()

export const User = {
  userId: '@ID',
  jobId: '@ID',
  email: '@EMAIL',
  name: '@CNAME',
  experience: '@NATURAL(0, 7)',
  intro: '@PARAGRAPH',
  phone: '949346789',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  resumeId: '@ID',
  avatarUrl: `@IMAGE('100x100', '#ffbbaa', 'Avatar')`
}
export const Resume = {
  resumeId: '@ID',
  url: '@URL',
  name: '@URL'
}

export const Job = {
  jobId: '@ID',
  refererId: '@ID',
  referer: {
    name: '@CNAME',
    avatarUrl: `@IMAGE('100x100', '#aabbff', 'Referer')`,
  },
  'company|1': companies,
  requiredFields,
  deadline: dateRange(),
  'expiration|1': expiration,
  referredCount: '@NATURAL(30, 100)',
  referTotal: '@NATURAL(100, 300)',
  source: '@URL',
  createdAt: dateRange(),
  updatedAt: dateRange(),
  'processedChart|12': [{
    date: `@DATE('yyyy-MM-dd')`,
    count: '@NATURAL(50, 100)'
  }]
}

export const Refer = {
  referId: '@ID',
  jobId: '@ID',
  refererId: '@ID',
  refereeId: '@ID',
  name: '@CNAME',
  email: '@EMAIL',
  phone: '949346789',
  experience: '@NATURAL(0, 7)',
  intro: '@PARAGRAPH',
  leetCodeUrl: '@URL',
  thirdPersonIntro: '@PARAGRAPH',
  referLinks: '@URL',
  resumeId: '@ID',
  'status|1': status,
  updatedOn: dateRange(),
  updatedAt: dateRange(),
  createdAt: now(),
  job: Job,
  referer: User,
  referee: User
}
// 查看 Refer 状态的 Item，以后需要扩展
export const MyRefer = {
  referId: '@ID',
  referer: {
    name: '@CNAME',
  },
  job: {
    jobId: '@ID',
    'company|1': companies
  },
  'status|1': status,
  updatedAt: dateRange(),
  source: '@URL'
}
// Refer 表中的一行，以后需要扩展
export const OtherRefer = {
  referId: '@ID',
  name: '@CNAME',
  resume: {
    resumeId: '@ID',
    url: '@URL',
    name: '@CNAME'
  },
  job: {
    jobId: '@ID'
  },
  referer: {
    name: '@CNAME'
  },
  referee: {
    name: '@CNAME'
  },
  experience: '@NATURAL(0, 7)',
  createdAt: now()
}
