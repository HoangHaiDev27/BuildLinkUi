export interface ApiResponse<T = any> {
    success: boolean
    message: string
    data?: T
    errors?: string[]
  }
  
  export const apiClient = {
    async post<T = any>(url: string, data: any): Promise<ApiResponse<T>> {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
  
        const result = await response.json()
        
        if (!response.ok) {
          return {
            success: false,
            message: result.message || 'Đã có lỗi xảy ra',
            errors: result.errors,
          }
        }
  
        return result
      } catch (err) {
        return {
          success: false,
          message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
        }
      }
    },
  }