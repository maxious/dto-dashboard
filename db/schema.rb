# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160919025831) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree
  end

  create_table "dashboards", force: :cascade do |t|
    t.integer  "organisation_id",                null: false
    t.text     "name",                           null: false
    t.text     "description",                    null: false
    t.text     "target_users",                   null: false
    t.text     "notes"
    t.text     "url"
    t.boolean  "display_hero",    default: true, null: false
    t.boolean  "display_kpis",    default: true, null: false
    t.datetime "published_at"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.index ["organisation_id"], name: "index_dashboards_on_organisation_id", using: :btree
  end

  create_table "dashboards_users", force: :cascade do |t|
    t.integer  "dashboard_id", null: false
    t.integer  "user_id",      null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["dashboard_id"], name: "index_dashboards_users_on_dashboard_id", using: :btree
    t.index ["user_id"], name: "index_dashboards_users_on_user_id", using: :btree
  end

  create_table "datapoints", force: :cascade do |t|
    t.integer  "dataset_id", null: false
    t.datetime "ts",         null: false
    t.decimal  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_datapoints_on_dataset_id", using: :btree
    t.index ["ts"], name: "index_datapoints_on_ts", using: :btree
  end

  create_table "dataset_widgets", force: :cascade do |t|
    t.integer  "dataset_id", null: false
    t.integer  "widget_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_dataset_widgets_on_dataset_id", using: :btree
    t.index ["widget_id"], name: "index_dataset_widgets_on_widget_id", using: :btree
  end

  create_table "datasets", force: :cascade do |t|
    t.integer  "organisation_id"
    t.text     "name",            null: false
    t.text     "label",           null: false
    t.text     "units",           null: false
    t.text     "notes"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organisation_id"], name: "index_datasets_on_organisation_id", using: :btree
  end

  create_table "organisations", force: :cascade do |t|
    t.text     "name",        null: false
    t.text     "url",         null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "tokens", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "token",                      null: false
    t.boolean  "session",    default: false, null: false
    t.datetime "expired_at"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["token"], name: "index_tokens_on_token", unique: true, using: :btree
    t.index ["user_id"], name: "index_tokens_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.integer  "organisation_id",                     null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["organisation_id"], name: "index_users_on_organisation_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree
  end

  create_table "widgets", force: :cascade do |t|
    t.integer  "dashboard_id",                              null: false
    t.integer  "row",             limit: 2,                 null: false
    t.integer  "pos",             limit: 2,                 null: false
    t.text     "name",                                      null: false
    t.text     "type",                                      null: false
    t.text     "size",                                      null: false
    t.text     "units",                                     null: false
    t.text     "description"
    t.text     "options"
    t.boolean  "is_hero",                   default: false, null: false
    t.datetime "last_updated_at",                           null: false
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.index ["dashboard_id"], name: "index_widgets_on_dashboard_id", using: :btree
  end

end
