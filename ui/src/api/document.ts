import { Result } from '@/request/Result'
import { get, post, del, put } from '@/request/index'
import type { Ref } from 'vue'
import type { KeyValue } from '@/api/type/common'
import type { pageRequest } from '@/api/type/common'
const prefix = '/dataset'

/**
 * 分段预览（上传文档）
 * @param 参数  file:file,limit:number,patterns:array,with_filter:boolean
 */
const postSplitDocument: (data: any) => Promise<Result<any>> = (data) => {
  return post(`${prefix}/document/split`, data)
}

/**
 * 分段标识列表
 * @param loading 加载器
 * @returns 分段标识列表
 */
const listSplitPattern: (
  loading?: Ref<boolean>
) => Promise<Result<Array<KeyValue<string, string>>>> = (loading) => {
  return get(`${prefix}/document/split_pattern`, {}, loading)
}

/**
 * 文档分页列表
 * @param 参数  dataset_id,   
 * page {
              "current_page": "string",
              "page_size": "string",
            }
* param {
          "name": "string",
        }
 */

const getDocument: (
  dataset_id: string,
  page: pageRequest,
  param: any,
  loading?: Ref<boolean>
) => Promise<Result<any>> = (dataset_id, page, param, loading) => {
  return get(
    `${prefix}/${dataset_id}/document/${page.current_page}/${page.page_size}`,
    param,
    loading
  )
}

const getAllDocument: (dataset_id: string, loading?: Ref<boolean>) => Promise<Result<any>> = (
  dataset_id,
  loading
) => {
  return get(`${prefix}/${dataset_id}/document`, undefined, loading)
}

/**
 * 创建批量文档
 * @param 参数 
 * {
  "name": "string",
  "paragraphs": [
    {
      "content": "string",
      "title": "string",
      "problem_list": [
          {
            "id": "string",
              "content": "string"
          }
      ]
    }
  ]
}
 */
const postDocument: (dataset_id: string, data: any) => Promise<Result<any>> = (
  dataset_id,
  data
) => {
  return post(`${prefix}/${dataset_id}/document/_bach`, data)
}

/**
 * 修改文档
 * @param 参数 
 * dataset_id, document_id, 
 * {
      "name": "string",
      "is_active": true
    }
 */
const putDocument: (dataset_id: string, document_id: string, data: any) => Promise<Result<any>> = (
  dataset_id,
  document_id,
  data: any
) => {
  return put(`${prefix}/${dataset_id}/document/${document_id}`, data)
}

/**
 * 删除文档
 * @param 参数 dataset_id, document_id,
 */
const delDocument: (dataset_id: string, document_id: string) => Promise<Result<boolean>> = (
  dataset_id,
  document_id
) => {
  return del(`${prefix}/${dataset_id}/document/${document_id}`)
}

/**
 * 文档详情
 * @param 参数 dataset_id
 */
const getDocumentDetail: (dataset_id: string, document_id: string) => Promise<Result<any>> = (
  dataset_id,
  document_id
) => {
  return get(`${prefix}/${dataset_id}/document/${document_id}`)
}

export default {
  postSplitDocument,
  getDocument,
  getAllDocument,
  postDocument,
  putDocument,
  delDocument,
  getDocumentDetail,
  listSplitPattern
}
