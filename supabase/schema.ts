export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Categories: {
        Row: {
          id: number
          name: string | null
          sequence: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
      }
      Expenses: {
        Row: {
          categoryId: number | null
          date: string | null
          description: string | null
          groupId: string | null
          id: string
          payer: string | null
          payment: number | null
          registeredAt: string | null
          registeredBy: string | null
          settled: boolean | null
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          categoryId?: number | null
          date?: string | null
          description?: string | null
          groupId?: string | null
          id?: string
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          categoryId?: number | null
          date?: string | null
          description?: string | null
          groupId?: string | null
          id?: string
          payer?: string | null
          payment?: number | null
          registeredAt?: string | null
          registeredBy?: string | null
          settled?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
      }
      ExpenseStatus: {
        Row: {
          amount: number | null
          expenseId: string
          paid: boolean | null
          updatedAt: string | null
          updatedBy: string | null
          userId: string
        }
        Insert: {
          amount?: number | null
          expenseId: string
          paid?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId: string
        }
        Update: {
          amount?: number | null
          expenseId?: string
          paid?: boolean | null
          updatedAt?: string | null
          updatedBy?: string | null
          userId?: string
        }
      }
      Friendships: {
        Row: {
          friendEmail: string | null
          friendId: string | null
          id: string
          registeredAt: string | null
          statusId: number | null
          updatedAt: string | null
          userId: string | null
        }
        Insert: {
          friendEmail?: string | null
          friendId?: string | null
          id?: string
          registeredAt?: string | null
          statusId?: number | null
          updatedAt?: string | null
          userId?: string | null
        }
        Update: {
          friendEmail?: string | null
          friendId?: string | null
          id?: string
          registeredAt?: string | null
          statusId?: number | null
          updatedAt?: string | null
          userId?: string | null
        }
      }
      GroupMembers: {
        Row: {
          groupId: string
          memberId: string
        }
        Insert: {
          groupId: string
          memberId: string
        }
        Update: {
          groupId?: string
          memberId?: string
        }
      }
      Groups: {
        Row: {
          id: string
          name: string | null
          registeredAt: string | null
          registeredBy: string | null
          updatedAt: string | null
          updatedBy: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          registeredAt?: string | null
          registeredBy?: string | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          registeredAt?: string | null
          registeredBy?: string | null
          updatedAt?: string | null
          updatedBy?: string | null
        }
      }
      Methods: {
        Row: {
          id: number
          name: string | null
          sequence: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sequence?: number | null
        }
      }
      Status: {
        Row: {
          id: number
          statusName: string | null
        }
        Insert: {
          id?: number
          statusName?: string | null
        }
        Update: {
          id?: number
          statusName?: string | null
        }
      }
      Users: {
        Row: {
          email: string | null
          firstName: string | null
          id: string
          lastName: string | null
          password: string | null
          registeredAt: string | null
          updatedAt: string | null
        }
        Insert: {
          email?: string | null
          firstName?: string | null
          id: string
          lastName?: string | null
          password?: string | null
          registeredAt?: string | null
          updatedAt?: string | null
        }
        Update: {
          email?: string | null
          firstName?: string | null
          id?: string
          lastName?: string | null
          password?: string | null
          registeredAt?: string | null
          updatedAt?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_friendship: {
        Args: {
          user_id: string
          friend_email: string
        }
        Returns: number
      }
      get_borrowed_money_total: {
        Args: {
          user_id: string
        }
        Returns: undefined
      }
      get_expenses: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          categoryId: number
          categoryName: string
          payer: string
          payerFirstName: string
          payerLastName: string
          description: string
          payment: number
          date: string
          registeredAt: string
          userIds: string[]
          firstNames: string[]
          lastNames: string[]
          paids: boolean[]
          amounts: number[]
        }[]
      }
      get_total_borrowed_amount: {
        Args: {
          user_id: string
        }
        Returns: {
          payer: string
          totalAmount: number
          firstName: string
          lastName: string
        }[]
      }
      get_total_lent_amount: {
        Args: {
          user_id: string
        }
        Returns: {
          userId: string
          totalAmount: number
          firstName: string
          lastName: string
        }[]
      }
      get_user_friends: {
        Args: {
          user_id: string
        }
        Returns: {
          id: string
          firstName: string
          lastName: string
          email: string
        }[]
      }
      insert_expense: {
        Args: {
          group_name: string
          date: string
          registered_by: string
          member_ids: string[]
          member_paids: boolean[]
          member_amounts: number[]
          payer_id: string
          category_id: number
          description: string
          payment: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

